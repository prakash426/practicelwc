# Branching model

```text
project/<nn>-<slug>  -->  level/<name>  -->  develop  -->  main (protected)
exercise/<nn>-<slug> (starter, TODOs + failing tests; solution lives in project/*)
```

| Branch | Purpose | Protection |
|---|---|---|
| `main` | Always deployable. PR from `develop` only, green CI required. | Protected, default |
| `develop` | Integration branch. PRs from `level/*`. | Protected |
| `level/beginner` | Level 1 projects 1-9. | Long lived |
| `level/intermediate` | Level 2 projects 10-18. | Long lived |
| `level/advanced` | Level 3 projects 19-27. | Long lived |
| `level/capstone` | Level 4 projects 28-35. | Long lived |
| `project/<nn>-<slug>` | One solution branch per project, cut from its level branch. | Short lived |
| `exercise/<nn>-<slug>` | Starter code learners complete. | Short lived |

## Flow

1. Cut `project/<nn>-<slug>` from the matching `level/*` branch.
2. Build with green Jest plus Apex tests, open a PR back into `level/*`.
3. Level leads merge `level/*` into `develop` when the level is coherent.
4. Release `develop` into `main` with green CI and a changelog entry.

## Legacy branches

The remote still carries pre-curriculum branches (`master`, `barcelona`, `pawankalyan`, `multiSelectPickList`). They are untouched by this restructure and stay read only until a maintainer migrates anything worth keeping and retires them. Do not build new work on them. Note: `multiSelectPickList` contains a hardcoded org id in `project-scratch-def.json`; scrub it before migrating anything.
