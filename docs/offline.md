# Offline and mobile notes

Projects 22 (`offlineTechApp`) and 29 (`offlineWorkbench`) are the offline first track. Read this before building on them.

## Rules that keep offline working

- Use `lightning/uiGraphQLApi` v1 for offline reads, not the v2 online `lightning/graphql` module.
- `getRecord` must list explicit fields. Never fetch by layout: layouts are not analyzable offline.
- Components must be statically analyzable (no dynamic imports of uncached modules).
- Queue writes as drafts (SmartStore or localStorage pattern in project 22) and sync on reconnect with a visible conflict UX.

## Briefcase Builder limits (documented, Summer 26)

- 50,000 records per object, 5 briefcases per user, 10 rules per briefcase, 3 relationship levels. Project 29 sizes its reading sync inside these caps.

## What breaks offline

- Imperative Apex, `@wire(graphql)` v2, Experience Delivery content, session ID auth, and any `window` or `document` access during render (also an SSR rule, see project 25).

## Testing offline

- Jest covers the queue plus conflict branches with the network stubbed off. On device, use the Mobile Publisher preview or Salesforce Mobile App Plus with airplane mode, then reconnect and confirm the sync badge clears.
