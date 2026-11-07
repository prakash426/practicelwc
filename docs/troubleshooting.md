# Troubleshooting

## Scratch org

- **Expired org:** scratch orgs last up to 30 days (`--duration-days 14` in our scripts). Recreate with `npm run org:create` and push again.
- **Auth errors:** run `sf org list` to confirm your Dev Hub is connected, then `sf org login web --alias devhub --set-default-dev-hub`.
- **Deploy fails on API version:** this repo targets API 67.0 (Summer 26). Preview or older orgs may reject new modules; use a current scratch org.

## Jest

- **`Cannot find module '@salesforce/sfdx-lwc-jest'`:** run `npm install`. Requires Node 18+.
- **A single project test fails on clone:** check `force-app/test/jest-mocks/` exists and that you are on the right branch; `exercise/*` branches intentionally ship red tests.

## LWC runtime gotchas taught by this repo

- **`data:` downloads fail silently:** Lightning Web Security blocks `data:` URIs. Always download via `Blob` plus `URL.createObjectURL` (see project 9).
- **`innerHTML` blocked:** use `lwc:dom="manual"` with `textContent`, or template directives (see project 27).
- **GraphQL errors array non empty:** writes can return `{ data, errors }` with both set. Always check `errors?.length` (see project 13).
- **SSR hydration mismatch:** guard `window`/`document`, keep render pure, and use light DOM components (see project 25).

## Still stuck

Open an issue with the project number, branch, full error text, and `sf --version` plus `node --version`.
