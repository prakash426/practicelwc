import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { gql, graphql, executeMutation, refreshGraphQL } from 'lightning/graphql';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', editable: true },
    { label: 'Stage', fieldName: 'StageName' },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
    { type: 'action', typeAttributes: { rowActions: [{ label: 'Delete', name: 'delete' }] } }
];

export default class GraphqlOppEditor extends LightningElement {
    columns = COLUMNS;
    rows = [];
    draftValues = [];
    error;
    isLoading = true;
    newOpen = false;
    newName = '';
    newAmount = null;
    graphqlResult;

    @wire(graphql, {
        query: gql`
            query EditableOpps {
                uiapi {
                    query {
                        Opportunity(first: 50, orderBy: { CloseDate: { order: DESC } }) {
                            edges { node { Id Name { value } Amount { value } StageName { value } CloseDate { value } } }
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
            this.rows = (data.uiapi?.query?.Opportunity?.edges || []).map((e) => ({
                Id: e.node.Id,
                Name: e.node.Name?.value,
                Amount: e.node.Amount?.value,
                StageName: e.node.StageName?.value,
                CloseDate: e.node.CloseDate?.value
            }));
        } else if (errors) {
            this.error = errors;
        }
    }

    get hasRows() { return this.rows.length > 0; }
    get errorMessage() {
        const list = Array.isArray(this.error) ? this.error : [this.error];
        return list.filter(Boolean).map((e) => e.message || JSON.stringify(e)).join('; ');
    }

    checkErrors(result, successTitle) {
        if (result.errors?.length) {
            this.error = result.errors;
            this.dispatchEvent(new ShowToastEvent({ title: 'Server reported errors', message: this.errorMessage, variant: 'error' }));
            return false;
        }
        this.error = undefined;
        this.dispatchEvent(new ShowToastEvent({ title: successTitle, message: 'Change saved.', variant: 'success' }));
        return true;
    }

    async handleSave(event) {
        this.isLoading = true;
        try {
            for (const draft of event.detail.draftValues) {
                // eslint-disable-next-line no-await-in-loop
                const result = await executeMutation(
                    gql`mutation UpdateOpp($id: ID!, $name: String, $amount: Currency) {
                        uiapi { updateOpportunity(input: { id: $id, Name: $name, Amount: $amount }) { record { Id } } }
                    }`,
                    { id: draft.Id, name: draft.Name, amount: draft.Amount }
                );
                // eslint-disable-next-line no-await-in-loop
                if (!this.checkErrors(result, 'Updated')) return;
            }
            this.draftValues = [];
            await refreshGraphQL(this.graphqlResult);
        } finally {
            this.isLoading = false;
        }
    }

    async handleRowAction(event) {
        if (event.detail.action.name !== 'delete') return;
        this.isLoading = true;
        try {
            const result = await executeMutation(
                gql`mutation DeleteOpp($id: ID!) { uiapi { deleteOpportunity(input: { id: $id }) { success } } }`,
                { id: event.detail.row.Id }
            );
            if (this.checkErrors(result, 'Deleted')) await refreshGraphQL(this.graphqlResult);
        } finally {
            this.isLoading = false;
        }
    }

    handleNew() { this.newOpen = true; }
    handleNewCancel() { this.newOpen = false; this.newName = ''; this.newAmount = null; }
    handleNewName(e) { this.newName = e.target.value; }
    handleNewAmount(e) { this.newAmount = e.target.value; }

    async handleCreate() {
        if (!this.newName.trim()) {
            this.template.querySelector('lightning-input').reportValidity();
            return;
        }
        this.isLoading = true;
        try {
            const result = await executeMutation(
                gql`mutation CreateOpp($name: String!, $amount: Currency) {
                    uiapi { createOpportunity(input: { Name: $name, Amount: $amount, StageName: "Prospecting", CloseDate: "2026-12-31" }) { record { Id } } }
                }`,
                { name: this.newName, amount: this.newAmount }
            );
            if (this.checkErrors(result, 'Created')) {
                this.handleNewCancel();
                await refreshGraphQL(this.graphqlResult);
            }
        } finally {
            this.isLoading = false;
        }
    }
}
