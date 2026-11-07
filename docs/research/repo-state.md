# practicelwc repo state (inspection only)

Inspected: 2026-11-07. Workspace was NOT modified. All inspection done on a
fresh clone at `/tmp/practicelwc` of `https://github.com/prakash426/practicelwc`.

## 1. Workspace checkout

- Result: **missing**. Workspace root `/Users/prakash/GitHub Projects` contains
  only `agentforce-foundry/` and `Mitra/` (plus `.DS_Store`). No `practicelwc`
  directory exists there.
- Action taken: cloned to `/tmp/practicelwc` for inspection only.

## 2. Remote branches (verified via `git branch -a` + `git ls-remote --heads`)

Default branch on remote: `main` (`refs/remotes/origin/HEAD -> origin/main`).

| Branch | Head | Date | Files | Notes |
|---|---|---|---|---|
| `main` | `d29c5e2` | 2021-05-27 | 1 | STALE STUB. Only `README.md` ("# practicelwc / LWC Practice Project"). Initial commit only. |
| `master` | `faf3e21` | 2021-05-27 | 57 | Full SFDX project. Base for all other work. Default README is the stock SFDX template. |
| `barcelona` | `f893999` | 2021-05-30 | 61 | `master` + `lwc/barcelona` component (background image demo). |
| `pawankalyan` | `65d7c7b` | 2021-05-27 | 57 | `master` + 2 merged PRs (#1, #2, both master->pawankalyan). Content-equal to master. |
| `multiSelectPickList` | `77af6f4` | 2021-08-04 | 83 | RICHEST branch. `barcelona` + `account`, `learnEventCmpMaster`, `sushanthCmp`, `ContactController`, `BusinessUseCases` aura app, formula-field notes. Latest activity in repo. |

No tags, no releases, no `LICENSE`/`COPYING`/`NOTICE` on ANY branch (checked via
`git ls-tree` grep on all five branches).

## 3. File inventory (richest branch `multiSelectPickList`, 83 files)

Standard SFDX layout plus stray files:

- `sfdx-project.json` (api 51.0, single package dir `force-app`), `package.json`
  (stock sfdx-lwc-jest/prettier/husky template), `manifest/package.xml` (api 51.0).
- `config/project-scratch-def.json` (Developer ed., "prakash company").
- `.forceignore`, `.gitignore`, `.prettierrc`, `.prettierignore`, `.eslintignore`,
  `.vscode/`, `scripts/apex/hello.apex`, `scripts/soql/account.soql`.
- `force-app/main/default/`: `lwc/` (9 bundles: account, accountRecordCmp, barcelona,
  cOVID, learnEventCmpMaster, lwcCombobox, pawanMovies, permissionSetFinder,
  searchUserComponent, sushanthCmp), `aura/` (BusinessUseCases app), `classes/`
  (AccountRecordController, ContactController, SearchController + orphaned
  `CovidTriggerHandler.cls-meta.xml` with NO matching `.cls`), `triggers/`
  (covidTrigger), `objects/Candidate__c` (+ 11 fields, 1 list view).
- STRAY / needs cleanup: `project-scratch-def.json` at repo root (duplicates
  `config/`, contains a hardcoded `sourceOrg` id `00D1U000000rLoO` -> scrub before
  any public use), `config/scratch.info.json` (second scratch def, Enterprise,
  "Udemy Training Org"), `force-app/ButtonAsImageInFormulaField` (extensionless
  notes file sitting directly in `force-app/`, belongs in `docs/`).

## 4. README

- `main`: 2 lines, custom ("LWC Practice Project"). No setup instructions.
- All other branches: stock "Salesforce DX Project: Next Steps" template, zero
  project-specific content. No badges, no prerequisites, no scratch-org steps.

## 5. SFDX config (inspected bodies, `master` == all branches)

`sfdx-project.json`: `{"packageDirectories":[{"path":"force-app","default":true}],
"namespace":"","sfdcLoginUrl":"https://login.salesforce.com","sourceApiVersion":"51.0"}`.
Spring 21 era. No unlocked-package config, no `sf` CLI config, no `.github/`
workflows, no jest `__tests__` dirs, no `lwc/jsconfig.json`.

## 6. Proposed SFDX project structure

Model: single-package practice repo in the style of `trailheadapps/lwc-recipes`
(one `force-app` package dir, rich `docs/`, CI on every PR). Multi-package
(`force-app` + `level-1/` ...) is overkill for practice code and complicates
scratch-org push; keep ONE package dir and organize levels via `docs/` + branches.

```text
practicelwc/
  README.md                        # badges, what this is, per-level index, setup
  LICENSE                          # BSD-3-Clause (matches lwc-recipes) or MIT
  CONTRIBUTING.md                  # branch naming, PR checklist, naming conventions
  sfdx-project.json                # bump sourceApiVersion to current (62.x), keep force-app default
  package.json                     # sf v2 scripts: lint, test:unit, prettier:verify, version
  .forceignore  .gitignore  .prettierrc  .eslintrc*
  config/
    project-scratch-def.json       # ONE canonical dev scratch def (Developer ed.)
  docs/
    setup.md                       # prereqs, auth, push, assign permset, open org
    branching.md                   # this branching model, merge direction diagram
    level-1-beginner.md            # component index + what each teaches
    level-2-intermediate.md
    level-3-advanced.md
    formula-field-button-as-image.md  # migrated from stray force-app/ notes file
  force-app/main/default/
    lwc/                           # flat, one dir per bundle, lowerCamelCase names
    aura/  classes/  triggers/  objects/  applications/  flexipages/  permissionsets/
  manifest/package.xml
  scripts/apex/  scripts/soql/
  .github/workflows/ci.yml         # sf 2.x: prettier check, eslint, jest, scratch-org deploy
```

Cleanup items: (a) make `main` canonical and delete stale stub content by merging
richest work into it (see below); (b) move stray notes file to `docs/`;
(c) merge the two scratch defs into one `config/project-scratch-def.json`, delete
root `project-scratch-def.json` and `config/scratch.info.json`, scrub the
hardcoded org id from history if repo goes public; (d) fix or remove orphaned
`CovidTriggerHandler.cls-meta.xml`; (e) rename `cOVID` bundle to `covid`
(lowerCamelCase per LWC convention); (f) add `__tests__` jest tests per new bundle.

## 7. Proposed branching model

```text
  project/<n>-<slug> --+--> level/<n>-<name> --+--> develop --> main (protected)
  feature/<slug> -----'                         '-> PR only, squash merge
```

- `main` (protected, default): always deployable. Merge ONLY from `develop` via
  PR with green CI. Tag per completed level (`level-1-complete`).
- `develop` (protected): integration branch. Merge from `level/*` via PR.
- `level/1-beginner`, `level/2-intermediate`, `level/3-advanced` (long-lived):
  one per learning level; each holds that level's projects. Merge upward only.
- `project/<n>-<slug>` (short-lived, e.g. `project/04-multiselect-picklist`):
  one branch per practice project, cut from its level branch, PR back into it.
- `feature/<slug>`, `docs/<slug>`, `chore/<slug>`: same lifecycle for cross-cutting work.
- Retire legacy branches after migration: `master`, `barcelona`, `pawankalyan`,
  `multiSelectPickList` -> migrate content into `develop` + level branches, then
  delete (keeps history via merge commits).

Bootstrap sequence (NOT executed, inspection-only task): create `develop` from
`origin/multiSelectPickList` (richest), force-reset `main` content to it via PR,
cut `level/*` from `develop`, apply cleanup items as first PRs, add CI + LICENSE,
delete legacy branches.

## 8. Inspection evidence (commands run, all read-only to workspace)

- `ls /Users/prakash/GitHub Projects` -> no practicelwc checkout.
- `git clone https://github.com/prakash426/practicelwc /tmp/practicelwc`.
- `git branch -a`, `git remote -v`, `git log --oneline --all`, `git status`.
- `git ls-tree -r --name-only origin/<b>` for all 5 branches (+ counts).
- `git show origin/<b>:sfdx-project.json|package.json|config/project-scratch-def.json|README.md|manifest/package.xml|.forceignore|.gitignore`.
- `git log --format="%h %ad %s" --date=short` per branch; `git diff --stat origin/master..origin/multiSelectPickList`.
- License grep (`licen|copying|notice`, case-insensitive) across all branches -> none.
- Stray-file bodies: `project-scratch-def.json`, `config/scratch.info.json`,
  `force-app/ButtonAsImageInFormulaField` on `multiSelectPickList`.
