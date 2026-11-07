# Setup

Prerequisites: Node 18+, Salesforce CLI (`sf`), a Dev Hub org, and VS Code with the Salesforce Extension Pack recommended.

## One time setup

```bash
git clone https://github.com/prakash426/practicelwc.git
cd practicelwc
npm install
sf org login web --alias devhub --set-default-dev-hub
```

## Scratch org quickstart (recommended path)

```bash
npm run org:create   # creates the practicelwc scratch org (14 days)
npm run org:push     # deploys force-app
npm run org:open     # opens the org in your browser
```

Prefer explicit commands? These are equivalent:

```bash
sf org create scratch --definition-file config/project-scratch-def.json --alias practicelwc --duration-days 14 --set-default
sf project deploy start --source-dir force-app
sf org open
```

## Verify your install

```bash
npm run prettier:verify
npm run lint
npm run test:unit
```

All three must pass on a fresh clone. If `test:unit` reports missing modules, rerun `npm install` and check Node is 18+.

## Tear down

```bash
npm run org:teardown
```

## Troubleshooting installs

See `docs/troubleshooting.md` for auth errors, expired scratch orgs, and Jest setup issues.
