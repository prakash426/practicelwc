import { createElement } from 'lwc';
import GraphqlOppEditor from 'c/graphqlOppEditor';

jest.mock('lightning/graphql', () => ({
    gql: (s) => (Array.isArray(s) ? s.join('') : s),
    graphql: jest.fn(),
    executeMutation: jest.fn(),
    refreshGraphQL: jest.fn(() => Promise.resolve())
}), { virtual: true });

describe('c-graphql-opp-editor', () => {
    afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });

    function mockWire(payload) {
        const { graphql } = jest.requireMock('lightning/graphql');
        graphql.mockImplementation(() => (target, key) => { target[key] = payload; });
    }

    it('maps query edges to editable rows', async () => {
        mockWire({ data: { uiapi: { query: { Opportunity: { edges: [
            { node: { Id: '0061', Name: { value: 'Acme' }, Amount: { value: 9000 }, StageName: { value: 'Proposal' }, CloseDate: { value: '2026-12-01' } } }
        ] } } } }, errors: undefined });
        const el = createElement('c-graphql-opp-editor', { is: GraphqlOppEditor });
        document.body.appendChild(el);
        await Promise.resolve();
        expect(el.hasRows).toBe(true);
        expect(el.rows[0].Name).toBe('Acme');
    });

    it('surfaces non-empty errors array as alert', async () => {
        mockWire({ data: undefined, errors: [{ message: 'FIELD_CUSTOM_VALIDATION_EXCEPTION' }] });
        const el = createElement('c-graphql-opp-editor', { is: GraphqlOppEditor });
        document.body.appendChild(el);
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('[role="alert"]').textContent).toContain('FIELD_CUSTOM_VALIDATION_EXCEPTION');
    });

    it('checkErrors returns false and sets error on mutation errors', async () => {
        mockWire({ data: { uiapi: { query: { Opportunity: { edges: [] } } } }, errors: undefined });
        const el = createElement('c-graphql-opp-editor', { is: GraphqlOppEditor });
        document.body.appendChild(el);
        await Promise.resolve();
        const ok = el.checkErrors({ data: null, errors: [{ message: 'nope' }] }, 'Updated');
        expect(ok).toBe(false);
        expect(el.errorMessage).toContain('nope');
        expect(el.checkErrors({ data: {}, errors: [] }, 'Updated')).toBe(true);
    });
});
