import { LightningElement, wire } from 'lwc';
import { gql, graphql, refreshGraphQL } from 'lightning/graphql';

const COLUMNS = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Amount', fieldName: 'amount', type: 'currency' },
    { label: 'Stage', fieldName: 'stage' },
    { label: 'Account', fieldName: 'account' }
];

export default class GraphqlOppExplorer extends LightningElement {
    columns = COLUMNS;
    searchKey = '';
    graphqlResult;
    error;
    isLoading = true;

    @wire(graphql, {
        query: gql`
            query OppsWithLines {
                uiapi {
                    query {
                        Opportunity(first: 50, orderBy: { CloseDate: { order: DESC } }) {
                            edges {
                                node {
                                    Id
                                    Name { value }
                                    Amount { value }
                                    StageName { value }
                                    Account { Name { value } }
                                    OpportunityLineItems(first: 25) {
                                        edges {
                                            node {
                                                Id
                                                Quantity { value }
                                                TotalPrice { value }
                                                Product2 { Name { value } }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    })
    wiredOpps(result) {
        this.graphqlResult = result;
        this.isLoading = false;
        const { data, errors } = result;
        if (data) {
            this.error = undefined;
        } else if (errors) {
            this.error = errors;
        }
    }

    get edges() {
        return this.graphqlResult?.data?.uiapi?.query?.Opportunity?.edges || [];
    }

    get filtered() {
        const key = this.searchKey.trim().toLowerCase();
        if (!key) return this.edges;
        return this.edges.filter((e) => (e.node.Name?.value || '').toLowerCase().includes(key));
    }

    get gridRows() {
        return this.filtered.map((e) => {
            const n = e.node;
            return {
                id: n.Id,
                name: n.Name?.value,
                amount: n.Amount?.value,
                stage: n.StageName?.value,
                account: n.Account?.Name?.value,
                _children: (n.OpportunityLineItems?.edges || []).map((l) => ({
                    id: l.node.Id,
                    name: `${l.node.Quantity?.value || 0} x ${l.node.Product2?.Name?.value || 'Item'}`,
                    amount: l.node.TotalPrice?.value,
                    stage: '',
                    account: ''
                }))
            };
        });
    }

    get hasRows() { return this.gridRows.length > 0; }
    get totalOpps() { return this.filtered.length; }
    get totalLines() { return this.gridRows.reduce((sum, r) => sum + (r._children?.length || 0), 0); }
    get errorMessage() {
        if (!this.error) return '';
        const list = Array.isArray(this.error) ? this.error : [this.error];
        return list.map((e) => e.message || JSON.stringify(e)).join('; ');
    }

    handleSearch(e) { this.searchKey = e.target.value; }
    async handleRefresh() {
        this.isLoading = true;
        try {
            await refreshGraphQL(this.graphqlResult);
        } finally {
            this.isLoading = false;
        }
    }
}
