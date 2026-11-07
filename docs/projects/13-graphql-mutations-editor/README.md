# 13. GraphQL Mutations: Inline Opp Editor

Business scenario I1: a rep edits opportunities inline without Apex round trips. `executeMutation` handles create/update/delete with explicit `errors?.length` checks (a non-empty errors array is a failure even with partial data); `refreshGraphQL` re-syncs after writes.

- Bundle: `graphqlOppEditor` (datatable inline edit, create panel, delete row action, mutation error alert)
- Apex fallback: `OppEditorFallback` (degraded-mode writes only) + test (2 tests)
- Jest: row mapping, errors-array alert, `checkErrors` true/false branches
- Concepts: executeMutation, selection rules (no child relationships), refreshGraphQL, error arrays
- Branch: `project/13-graphql-mutations-editor`
