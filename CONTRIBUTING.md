# Contributing to PracticeLWC

Thanks for helping learners master Lightning Web Components. This repo is a curriculum first and a codebase second: every change should teach something.

## Ground rules

1. **One project, one branch.** Cut `project/<nn>-<slug>` from its `level/*` branch. Keep the solution green: Jest plus Apex tests must pass.
2. **Exercises before solutions.** Starter code with TODOs and red tests lives on `exercise/<nn>-<slug>`. Learners PR there and compare against `project/*`.
3. **Follow the design rules** (see `docs/curriculum.md`): API v67, `with sharing` plus user-mode Apex, no `WITH_SECURITY_ENFORCED`, no `data:` downloads (use `Blob` URLs), no Aura wrappers, no session-ID auth, no `.ts` shipped to the org.
4. **Docs with code.** Every project needs `docs/projects/<nn>-<slug>/README.md` with scenario, persona, concepts, tasks, acceptance criteria, and a demo GIF or placeholder.

## Workflow

```bash
git checkout level/1-beginner
git checkout -b project/01-hello-lead-card
# ... build, then ...
npm run prettier:write
npm run lint
npm run test:unit
sf project deploy start --source-dir force-app
git push -u origin project/01-hello-lead-card
```

Open a PR into the matching `level/*` branch. Level branches merge into `develop`, and `develop` merges into `main` (protected) only with green CI. See `docs/branching.md`.

## Style

- Prettier is the formatter (`npm run prettier:verify` must pass). LWC templates stay readable at 120 columns.
- ESLint includes LWC and Lightning Web Security minded rules. Fix warnings, do not suppress them without a comment.
- Apex: `with sharing`, `WITH USER_MODE` on SOQL and DML, named constants over magic strings, `TestDataFactory` style setup in tests.
- Commit messages use conventional prefixes: `feat:`, `fix:`, `docs:`, `test:`, `chore:`.

## Reporting issues

Open an issue with the project number, the branch, expected versus actual behavior, and `sf --version` plus Node version. Screenshots or GIFs help a lot for UI bugs.
