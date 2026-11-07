# 12. GraphQL Opportunity Explorer

Business scenario I1: a rep browses opportunities, line items, and accounts in one view. A single `@wire(graphql)` relational query replaces N wire adapters; results render in a `lightning-tree-grid` with client-side search and `refreshGraphQL`.

- Bundle: `graphqlOppExplorer` (graphql wire, `{ data, errors }` handling, tree-grid, refresh, empty state)
- Apex fallback: `OppExplorerService.getOpportunities` (cacheable, user mode) + test (2 tests) for orgs without GraphQL API
- Jest: edge-to-row mapping, search filter
- Concepts: lightning/graphql v2 online, relational queries, refreshGraphQL, error arrays
- Branch: `project/12-graphql-opportunity-explorer`
