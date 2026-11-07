import { createElement } from 'lwc';
import GraphqlOppExplorer from 'c/graphqlOppExplorer';

const GRAPHQL_DATA = {
    uiapi: { query: { Opportunity: { edges: [
        { node: { Id: '0061', Name: { value: 'Acme Deal' }, Amount: { value: 50000 }, StageName: { value: 'Proposal' }, Account: { Name: { value: 'Acme' } },
          OpportunityLineItems: { edges: [{ node: { Id: '00k1', Quantity: { value: 2 }, TotalPrice: { value: 50000 }, Product2: { Name: { value: 'Widget' } } } }] } } }
    ] } } }
};

jest.mock('lightning/graphql', () => ({
    gql: (s) => s.join(''),
    graphql: jest.fn(),
    refreshGraphQL: jest.fn(() => Promise.resolve())
}), { virtual: true });

describe('c-graphql-opp-explorer', () => {
    afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });

    it('maps GraphQL edges to tree-grid rows', async () => {
        const { graphql } = jest.requireMock('lightning/graphql');
        graphql.mockImplementation(() => (target, key) => {
            target[key] = { data: GRAPHQL_DATA, errors: undefined };
        });
        const el = createElement('c-graphql-opp-explorer', { is: GraphqlOppExplorer });
        document.body.appendChild(el);
        await Promise.resolve();
        expect(el.totalOpps).toBe(1);
        expect(el.totalLines).toBe(1);
        expect(el.gridRows[0].name).toBe('Acme Deal');
        expect(el.gridRows[0]._children[0].name).toContain('Widget');
    });

    it('filters rows by search key', async () => {
        const { graphql } = jest.requireMock('lightning/graphql');
        graphql.mockImplementation(() => (target, key) => {
            target[key] = { data: GRAPHQL_DATA, errors: undefined };
        });
        const el = createElement('c-graphql-opp-explorer', { is: GraphqlOppExplorer });
        document.body.appendChild(el);
        await Promise.resolve();
        el.searchKey = 'zzz-no-match';
        await Promise.resolve();
        expect(el.hasRows).toBe(false);
    });
});
