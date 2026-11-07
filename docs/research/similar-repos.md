# LWC Learning Repos: Competitive Research Report

Date: 2026-11-07. Method: shallow clone to `/tmp/lwc-research`, README + source + config inspection, GitHub API metadata (stars/topics/homepage/license/branch).
Scope: official flagships, Trailhead sample apps, awesome lists, community learning/practice repos (5), book companion, framework reference.

## TL;DR

- Official `trailheadapps/lwc-recipes` (2,897 stars) is the undisputed reference: 133 atomic components, 130+ Jest suites, full CI, unlocked package. But it is a pattern catalog, not a leveled curriculum: no beginner to advanced path, no exercises with solutions, no real-world multi-object flows.
- Sample apps (`ebikes-lwc`, `dreamhouse-lwc`, `ecars`, `build-apps-with-lwc`) show full apps but are demo/showcase oriented: heavy install, no practice tasks, README is install manual not tutorial.
- Best community engineering bar is `svierk/awesome-lwc-collection` (306 stars, 30 components, 29 Jest suites, per-component README + VitePress catalog, Sonar + Codecov). It is a drop-in library, not a course: no levels, no exercises.
- Community practice repos (`tsalb/intro-to-lwc`, `rahulgawale/lwc-e-commerce-recipe`, `selcukgoktas/SalesforceDeveloperTraining`, `deepank99/KFP`) have the right learning intent but fail on quality signals: 0 to stub-only tests, no CI, stale API versions (49.0 to 56.0), inconsistent naming, default/boilerplate READMEs, missing topics/homepage/license, single-digit stars.
- `Confirm4Crit/awesome-lwc` (196 stars) is the main discovery hub but is a link list with a dated LWC OSS site, no runnable code, no curation by level.
- Gap for a new practice repo: leveled curriculum (beginner/intermediate/advanced) + real-world scenarios + working Jest + CI + one-command deploy + SEO (topics, homepage, social preview, per-project READMEs) + practice branches/exercises. Nobody combines all of these.

## Repo-by-repo findings

### 1. trailheadapps/lwc-recipes (official flagship)
- URL: https://github.com/trailheadapps/lwc-recipes. Stars 2,897, forks 3,249. License CC0-1.0. Default branch `main`. Topics: apex, jest, lightning-web-components, salesforce. Homepage developer.salesforce.com.
- Folder structure: classic SFDX single package `force-app/main/default/` with 133 LWC bundles plus applications, aura, classes, flexipages, flows, objects, permissionsets, staticresources, tabs, messageChannels, prompts, quickActions. Inspected: `/tmp/lwc-research/lwc-recipes/force-app/main/default/lwc/` (compositionBasics, hello*, apexWire*, graphql*), `/tmp/lwc-research/lwc-recipes/sfdx-project.json` (unlocked package LWCRecipes, sourceApiVersion 66.0), `/tmp/lwc-research/lwc-recipes/package.json`.
- Branching: trunk `main` only in clone; CONTRIBUTING.md prescribes topic branches off `main`, rebase, fork + PR + Salesforce CLA. No long-lived dev/release branches, no per-level branches.
- README style: 197 lines. Badge row (CI, Packaging, Codecov), logo, one-paragraph pitch, Trailhead badge block + video, install-by-3-paths (scratch org recommended, unlocked package, DE/Playground), code tours. No component catalog in README; discovery happens in-org via View Source links.
- Level coverage: breadth-first, not leveled. hello* (basics), composition*, apex*, wire*, graphql*, LMS, navigation, third-party libs. No beginner/intermediate/advanced labels, no exercises.
- Tests/CI/deployment: best in class. 130 `__tests__` dirs, 132 `*.test.js`, `sfdx-lwc-jest`, sa11y setup, eslint, prettier, husky + lint-staged, Codecov. Workflows: ci.yml, ci-pr.yml, packaging.yml, packaging-pr.yml, auto-assign, codetour-watch, new-issue-welcome. Deploy via scratch push, unlocked-package install, or DE deploy. Inspected: `/tmp/lwc-research/lwc-recipes/.github/workflows/ci.yml`, `/tmp/lwc-research/lwc-recipes/jest.config.js`.
- What it lacks: curriculum/practice layer (no tasks, no solution branches), no multi-step business scenario (each recipe is atomic), README has no per-recipe index, no social/SEO beyond Salesforce owned channels.
- Why highlighted anyway: official, Trailhead-integrated, sample-gallery placement, always current API (66.0), package install is one click. Discoverability is platform-driven, not repo-SEO-driven.

### 2. trailheadapps/ebikes-lwc
- URL: https://github.com/trailheadapps/ebikes-lwc. Stars 846, forks 1,239. CC0-1.0, `main`. Topics add experience-cloud + utam. Homepage developer.salesforce.com.
- Structure: full retail app, 22 LWC (productCard, productTileList, orderBuilder, navigationMenu, hero*), plus digitalExperiences, networks, sites, platformEventChannelMembers. UTAM UI tests (`__utam__/*.utam.json`) plus `utam.config.js`, `wdio.conf.js`. Inspected: `/tmp/lwc-research/ebikes-lwc/force-app/main/default/lwc/`, `/tmp/lwc-research/ebikes-lwc/package.json` (test:ui, test:ui:compile).
- Branching/README: same org template as recipes (topic branches off main, CLA). README 261 lines, install manual + optional Pub Sub demo + UI-test section. No levels.
- Coverage: intermediate-advanced integration showcase (Experience Cloud, guest profile, events). Too heavy for Day-1 practice; no exercises.
- Tests/CI/deploy: 18 Jest files, 1 Apex test class (CommunitiesLandingControllerTest), UTAM/wdio, CI workflows (no packaging). Scratch + DE paths.
- Lacks: leveled learning, practice tasks, lightweight quickstart. Install requires Experience setup; README never teaches LWC concepts.
- Why second-tier highlight: Trailhead Quick Start + video keep it visible, but narrower use case (retail + Experience) caps stars at ~30 percent of recipes.

### 3. trailheadapps/dreamhouse-lwc
- URL: https://github.com/trailheadapps/dreamhouse-lwc. Stars 508, forks 983. Apache-2.0, `main`. Topics: apex, lightning-web-components, salesforce.
- Structure: 17 LWC (propertyTile, propertyMap, propertyFilter, sampleDataImporter, barcodeScanner), real-estate objects. Same SFDX + Jest + sa11y template. Inspected: `/tmp/lwc-research/dreamhouse-lwc/force-app/main/default/lwc/`, `/tmp/lwc-research/dreamhouse-lwc/.github/workflows/`.
- README 214 lines, same install-manual template + sample-data note + credits. No levels/exercises.
- Tests/CI/deploy: Jest suites, CI + packaging workflows, scratch/unlocked/DE paths.
- Lacks: same as ebikes; also legacy Aura predecessor splits attention (README has to disclaim Aura version).
- Why mid-tier: oldest brand (Dreamhouse), but real-estate demo feels dated vs ebikes; stars reflect age + gallery placement, not practice value.

### 4. trailheadapps/ecars
- URL: https://github.com/trailheadapps/ecars. Stars 183, forks 126. CC0-1.0, `main`. Topics: change-data-capture, heroku, kafka, mqtt, salesforce.
- Structure: monorepo (lerna) with `force-app` (13 LWC: carConfigurator, inventory, liveData, serviceDataAnalyzer) + `apps/` (Heroku services) + Postgres. Architecture diagram in README. Inspected: `/tmp/lwc-research/ecars/`, `/tmp/lwc-research/ecars/lerna.json`, `/tmp/lwc-research/ecars/scripts/ecarsDeploy.js` (referenced).
- Branching/README: trunk main. README 242 lines, prerequisites demand paid Heroku Eco + Postgres Mini, automated `ecarsDeploy.js` + manual path + teardown. Demo-highlights section, not tutorial.
- Coverage: advanced architect-level (event-driven, multi-cloud). Actively hostile to beginners (cost + multi-app deploy).
- Tests/CI/deploy: Jest + services tests (`test:services`), lint, CI workflows. Deploy is the product (scripted multi-target).
- Lacks: everything a learner needs: no levels, no isolated practice, no free-tier path.
- Why not highlighted: smallest audience, Heroku cost disclaimer, no Trailhead badge block, lowest stars of the official set despite good engineering.

### 5. trailheadapps/build-apps-with-lwc (Ursus Park)
- URL: https://github.com/trailheadapps/build-apps-with-lwc. Stars 44, forks 204. No license field. Default branch `master` (legacy). Topics: lwc, salesforce, trailhead.
- Structure: minimal SFDX app (Bear__c objects, flexipages, permissionsets); `force-app/main/default/lwc/` contains only `.eslintrc.json` (no LWC bundles; inspected `/tmp/lwc-research/trailheadapps_build-apps-with-lwc/force-app/main/default/lwc/`). No package.json, no Jest, no workflows. sourceApiVersion 55.0.
- README: 5 lines only: title + "We are not accepting contributions" + Trailhead feedback link. Learning lives on Trailhead, repo is just deploy target.
- Coverage: beginner Trailhead project companion, but repo itself teaches nothing.
- Lacks: code, tests, CI, docs, branching (single master, last commit "ignore .sf folder").
- Why not highlighted: by design a throwaway slingshot repo; high forks (204) vs stars (44) proves clone-and-discard usage. Anti-pattern for discoverability: no description depth, no topics breadth, no README.

### 6. Confirm4Crit/awesome-lwc (awesome list + OSS site)
- URL: https://github.com/Confirm4Crit/awesome-lwc. Stars 196, forks 45, 21 open issues. No license. `main`. Topics: lightning-web-components, lwc, lwc-oss, lwcoss, salesforce, salesforce-developers. Homepage https://www.awesomelwc.com/.
- Structure: NOT an SFDX project. Curated README (258 lines) + LWC OSS site (`src/modules/my/*`, `lwc-services.config.js`, `lwc.config.json`). Sections: On Platform Community Repos, Locker Safe JS, Official Examples, Posts/Blogs/Sites, JEST posts, Learn LWC, New to JS, VS Code setup, OSS LWC. Inspected: `/tmp/lwc-research/awesome-lwc/README.md`, `/tmp/lwc-research/awesome-lwc/src/modules/my/`.
- Branching: single main, PR-driven list additions ("Fork, PR, contribute"). Last commit "add repo (#45)".
- README style: link dump with one-line blurbs + author handles, Discord invite (SFXD), no leveling, no freshness dates, no stars/badges per entry.
- Coverage: pointer to all levels but no teaching; JS-library suggestions ask for rationale, rarely given.
- Tests/CI/deploy: jest.config.js present but no force-app tests; no workflows; site deploy is Heroku-era Express (`compression`, `express`, `helmet`, node >= 10).
- Lacks: runnable practice, curation quality (stale links, no last-verified), no CI, no tests, no deployment story for learners.
- Why modestly highlighted: only cross-repo discovery hub + memorable domain; but 21 open issues, no license, and OSS site built on 2020-era lwc-services cap trust and stars.

### 7. svierk/awesome-lwc-collection (community library, engineering best)
- URL: https://github.com/svierk/awesome-lwc-collection. Stars 306, forks 76. MIT. `main`. Topics: component-library, jest, lightning-web-components, lwc, salesforce, sfdx. Homepage VitePress catalog.
- Structure: focused SFDX `force-app` (30 LWC in 5 README categories: Data and Tables, Files and Documents, Maps and Charts, Media and Input, Fundamentals and Integration; classes, objects, staticresources only). Every component ships `README.md` + `.svg` icon + `__tests__`. Inspected: `/tmp/lwc-research/awesome-lwc-collection/force-app/main/default/lwc/customDatatable/` (README with attribute table + usage snippet), `force-app/main/default/lwc/graphqlDatatable/`, `/tmp/lwc-research/awesome-lwc-collection/scripts/check-readmes.mjs` (referenced via lint:readme).
- Branching: trunk main, feature-branch + issue-first flow, issue templates (bug, new-component, feature). Dependabot auto-merge workflow.
- README style: 273 lines, best community README. Banner image, About, categorized component tables with icons + links, prerequisites, getting-started (npm install, authorize, deploy, `sf lightning dev component` local dev), quality-measures (hooks, Prettier, ESLint, Jest, VitePress), contributing. Per-component READMEs feed auto-generated catalog.
- Coverage: intermediate-advanced reusable patterns (GraphQL wire, datatable extensions, 3D ThreeJS, signature pad, org chart). No beginner path, no exercises; assumes SFDX fluency.
- Tests/CI/deploy: 29 Jest suites, 3+ Apex test classes (ContentDocumentControllerTest, etc.), CI + docs + dependabot workflows, SonarCloud + Codecov + FOSSA badges, `lint:readme` doc check, `lint:sonar`. Deploy to DE or scratch; no unlocked package.
- Lacks: curriculum layer (no levels/exercises/solutions), no real-world end-to-end scenario (components are isolated), no packaging one-click install.
- Why highlighted among community: highest quality signals (docs site, Sonar, per-component tests), MIT license, active (updated Nov 2026). Stars still ~10 percent of recipes because it is a library, not a course, and has no Trailhead funnel.

### 8. tsalb/intro-to-lwc (community beginner guide)
- URL: https://github.com/tsalb/intro-to-lwc. Stars 79, forks 10. No license. Default branch `master` (stale signal). Topics good: lightning-web-components, lwc, salesforce, salesforce-developers, salesforce-lightning, sfdx. No homepage.
- Structure: tiny SFDX shell: 2 LWC only (`item`, `storeFront`, 3 files each, no tests), `manifest/package.xml`, `config/`, `readme-images/`. Knowledge lives in README + external wiki (Lessons Learned), not code. Inspected: `/tmp/lwc-research/intro-to-lwc/force-app/main/default/lwc/item/item.js` (4-line @api class), `/tmp/lwc-research/intro-to-lwc/README.md` (203 lines).
- Branching: single master, last commit "Update README.md" (2025). No CI, no CONTRIBUTING.
- README style: long-form mentor essay: 10-step org-development-model setup, wiki pointer, "Why Org Dev Model", "What about Aura", browser/JS fundamentals, org caching/CDN, LWC fundamentals (naming, reactivity/decorators), hands-on exercise stubs (exercise-1..3). Valuable mental models, but JDK-era SFDX CLI links (atlas 224.0), wrong clone URL in text (`intro-to-lwcs.git`), no screenshots.
- Coverage: beginner only, fundamentals-first. Explicitly defers Aura migration and advanced topics to lwc-utils.
- Tests/CI/deploy: 0 Jest files despite `sfdx-lwc-jest` in devDeps; no workflows; deploy via manifest right-click (org dev model). No scratch flow.
- Lacks: code depth (2 trivial components), tests, CI, packaging, exercises with solutions, upkeep (master branch, 2021-era deps: eslint 5, sfdx-lwc-jest 0.7).
- Why not highlighted: high intent, low artifact. Teaches via prose while learners need runnable tasks; no homepage/license/topics-to-stars conversion; same author funnels advanced users to lwc-utils instead.

### 9. tsalb/lwc-utils (community advanced, data-dense UI)
- URL: https://github.com/tsalb/lwc-utils. Stars 396, forks 98, 40 open issues. BSD-3. `master`. Topics: 8 incl. lightning-datatable, salesforce-lightning-components. No homepage.
- Structure: dual-package SFDX (`utils-core/main/default/lwc/` 27 bundles: soqlDatatable, collectionDatatable, baseDatatable*, messageService, empApi, fuseBasic, luxon; `utils-recipes/main/default/lwc/` 9 example bundles). No `force-app/` (nonstandard paths hurt tooling/SEO). Inspected: `/tmp/lwc-research/lwc-utils/utils-core/main/default/lwc/`, `/tmp/lwc-research/lwc-utils/sfdx-project.json`, `/tmp/lwc-research/lwc-utils/README.md` (45 lines).
- Branching: master, PR format/lint checks (`pr.format-all.yml`, `pr.lint-lwc.yml`), no full CI, release 1.8.0.
- README style: short pitch + motivation + wiki-dependent getting started (overview, installation core/recipes, configuration, FAQ all off-page). Core value hides in wiki, hurting skimmers and SEO.
- Coverage: advanced only (datatables, LMS, Aura+LWC modals, Screen Flows). README claims "10x solution speed" and "thousands of developer hours saved" but shows no benchmark.
- Tests/CI/deploy: 0 Jest files; no Apex tests found; lint/format PR checks only. Install core + recipes into scratch org per wiki.
- Lacks: tests (biggest gap for 396-star repo), beginner/intermediate ramp, in-repo docs, standard layout, homepage, package.
- Why semi-highlighted anyway: solves painful real problems (SOQL datatable, flow dialogs) with live utility; 40 open issues signal demand exceeding maintenance. Stars come from usefulness, not learnability.

### 10. PacktPublishing/Salesforce-Lightning-Web-Component-Cookbook
- URL: https://github.com/PacktPublishing/Salesforce-Lightning-Web-Component-Cookbook. Stars 20, forks 63. MIT. `main`. Topics: none. No homepage.
- Structure: book-shaped: `force-app/chapter00..chapter13` (+ chapter06_setup, chapter11_setup, chapter12_setup, default), ~30 LWC meta files (myFirstLWC, transferAsset, assetMap, topTenAccountTabset, addAsset*). Inspected: `/tmp/lwc-research/Salesforce-Lightning-Web-Component-Cookbook/force-app/`, `.../chapter01/default/lwc/`.
- Branching: single main, Packt housekeeping commits (Dependabot postcss bump). No CONTRIBUTING/CI workflows.
- README style: 48 lines, publisher template: Description (70+ recipes), Who Is This Book For (intermediate-experienced), What You Will Learn (8 bullets), Instructions (fork, clone, authorize DE, deploy chapters 1-12; ch13 needs apex-mockery BSD dependency with full license paste), author bio. No per-chapter index, no screenshots.
- Coverage: intermediate-advanced book path (composition, wire/Apex, LWS/Locker, caching/lazy load, Jest + Apex tests, VF/Aura migration, external APIs). Needs the paid book; repo alone is unordered code.
- Tests/CI/deploy: 2 Jest files only, no workflows; package.json is anomalous (name `@lwc/eslint-plugin-lwc` v1.8.2, mocha+nyc + sfdx-lwc-jest mix) suggesting template reuse. Deploy chapter-by-chapter manually.
- Lacks: runnable learning without book, tests vs claims, CI, topics/homepage/SEO (zero topics), per-chapter READMEs.
- Why not highlighted: forks (63) exceed stars (20): buyers clone, few star. Publisher template + missing topics + no docs site = near-invisible in GitHub search.

### 11. rahulgawale/lwc-e-commerce-recipe (community workshop)
- URL: https://github.com/rahulgawale/lwc-e-commerce-recipe. Stars 19, forks 12. No license. `master`. Topics: apex, lightning-web-components, salesforce, slds. Homepage forcetrails.com blog.
- Structure: small SFDX app: 5 LWC (productTile, productsList, productSearch, productSearchForm, productFilters), classes, flexipages, messageChannels, objects. sourceApiVersion 49.0 (2020). Inspected: `/tmp/lwc-research/rahulgawale_lwc-e-commerce-recipe/force-app/main/default/lwc/productTile/productTile.js` (addedToCart CustomEvent pattern), `/tmp/lwc-research/rahulgawale_lwc-e-commerce-recipe/README.md` (100 lines).
- Branching: single master ("added brand field"). No CI/CONTRIBUTING.
- README style: workshop handout: pitch, developers (HTML list), 3-step setup with external blog links (some 2017-2019), "Test your component" via Aura `.app` preview + sample `<c:productTile>` snippet, then pasted generic SFDX template (Choosing a Development Model, sfdx-project.json, Working with Source, Deploying to Production) that dwarfs project content.
- Coverage: beginner-intermediate single scenario (shopping/cart). Good real-world seed, but 5 components, no cart/checkout depth, no Apex wire showcase.
- Tests/CI/deploy: 0 tests, no workflows, no package. Manual DE deploy.
- Lacks: tests, CI, current API, complete commerce flow, per-component docs, license.
- Why not highlighted: blog-dependent (homepage is personal blog), stale API, template-padded README buries the useful 30 lines, no quality badges. Solves discoverability via blog SEO, not repo SEO.

### 12. selcukgoktas/SalesforceDeveloperTraining (class repo)
- URL: https://github.com/selcukgoktas/SalesforceDeveloperTraining. Stars 34, forks 11. No license ("cannot be used for business purpose" in description). `master`. Topics: apex, aura, lwc, salesforce, visualforce. Homepage personal site + Notion notes.
- Structure: course monolith: 44 LWC + aura, classes, triggers, pages, staticresources, messageChannels, manifest. Naming is inconsistent: `lWC01_HelloComponent`, `lWC02_Decorators`, `lwc12CommunicationChild`, `lwc14_SimpleTODO`, `trackDecoratorExample`, `iyzicocc`, `childresult`. Inspected: `/tmp/lwc-research/selcukgoktas_SalesforceDeveloperTraining/force-app/main/default/lwc/` (full 44 list), `lwc14_SimpleTODO/lwc14_SimpleTODO.js` (@track todo, unguarded empty add), README LWC01-LWC18 index.
- Branching: single master ("lwc theme base"). No CI/CONTRIBUTING.
- README style: 438 lines, longest in set. Syllabus index: Apex 1 + Test 1, Triggers 1-7, Async 1-4, Security, REST, VF 1-6, Aura 1-15, LWC01-LWC18 (hello, track/api, wire, apex calculator, LDS create, record-form x2, map, Aura interop, barcode, parent-child, pub-sub, TODO, design props, combobox, guest record-form, record-form+combobox). Each is 1-3 lines; depth lives in Notion (external, account-gated).
- Coverage: widest breadth (Apex + triggers + async + VF + Aura + LWC), LWC is beginner-intermediate. Closest to a leveled course in structure, but levels are implicit numbers, no difficulty tags, no exercises/solutions.
- Tests/CI/deploy: 35 `*.test.js` but sampled file is CLI stub ("TODO: test case generated by CLI command, please fill in test logic"); 1+ Apex tests. jest.config present, no workflows. Deploy via SFDX to training org.
- Lacks: real tests (stub count misleads), CI, naming/quality bar, in-repo lessons (Notion lock-in), license clarity (non-commercial note deters reuse), per-component docs.
- Why not highlighted: classroom-coupled (students must prep before courses), externalized content, quality signals (naming, stub tests, no CI) suppress stars despite best syllabus shape.

### 13. deepank99/KFP (personal practice dump)
- URL: https://github.com/deepank99/KFP. Stars 0, forks 0. No description, no topics, no homepage, no license. `main`. Updated 2023 (stale).
- Structure: mixed SFDX dump: 24 LWC in `force-app` (accSearch, accSearch1, toDoManager, contactCreator, bikeCard, boat* Trailhead leftovers, studentLightning) + stray `IdisUtils.js` at `default/` root + second package dir `LWCPackage/` ignored by sfdx-project.json (only force-app listed, name "PlatformEventToast", API 56.0). Inspected: `/tmp/lwc-research/deepank99_KFP/force-app/main/default/lwc/toDoManager/toDoManager.js` (empty class), `/tmp/lwc-research/deepank99_KFP/sfdx-project.json`.
- Branching: single main, one commit ("first commit"). No CI/CONTRIBUTING.
- README style: 18-line default SFDX template ("Salesforce DX Project: Next Steps") with zero project edits. Worst README in set.
- Coverage: accidental beginner collection (account search, TODO, boats) with duplicates (accSearch vs accSearch1) and empty shells.
- Tests/CI/deploy: 22 `*.test.js` but sampled test is `sum(1,2)` placeholder; Apex tests exist only under undeployed `LWCPackage/`. No workflows.
- Lacks: everything: description, docs, real tests, CI, deploy story, curation.
- Why invisible: textbook anti-pattern. Zero metadata means zero search surface; single-commit dump with template README earns no trust. Included here as the floor.

### 14. salesforce/lwc (framework reference, not learning repo)
- URL: https://github.com/salesforce/lwc. Stars 1,799, forks 459, 414 open issues. License NOASSERTION (monorepo). `master`. Topics: framework, library, lwc, salesforce, web-component, webcomponents. Homepage lwc.dev.
- Structure: yarn/nx monorepo (`packages/@lwc/*`, integration-wdio/wtr, perf benchmarks), vitest, bundlesize, release automation. Inspected top-level `/tmp/lwc-research/lwc/package.json` scripts only.
- Relevance: proves where OSS innovation lands first (intro-to-lwc README cites lwc + lwc-rfcs for sneak peeks), but not a practice repo. Learners should link it, not clone it.

## Cross-cutting analysis

### Folder structure
- Standard (9 of 13 SFDX repos): `force-app/main/default/lwc/<bundle>/{js,html,css,js-meta.xml,__tests__}` + `classes/`, `objects/`, `flexipages/`. Recipes, ebikes, dreamhouse, ecars-force-app, awesome-lwc-collection, intro-to-lwc, rahul, selcuk, deepank follow it.
- Variants: lwc-utils uses `utils-core/` + `utils-recipes/` (breaks default tooling glob assumptions); cookbook uses `force-app/chapterNN/default/` (book coupling, deploy per chapter); deepank adds undeployed `LWCPackage/`; awesome-lwc is LWC OSS site (`src/modules/my/`), not SFDX.
- Scale signal: recipes 133, selcuk 44, collection 30, cookbook ~30, deepank 24, ebikes 22, dreamhouse 17, ecars 13, rahul 5, intro 2, Ursus 0. Count alone misleads: selcuk/deepank inflate via duplicates/stubs; collection/recipes earn count via tests + docs.

### Branching strategy
- Universal trunk: `main` (8) or legacy `master` (6: intro, lwc-utils, rahul, selcuk, Ursus, salesforce/lwc). No repo uses dev/stage/release branches or per-level/per-exercise branches.
- Official flow: fork + topic branch + PR + CLA + CI + packaging (recipes CONTRIBUTING). Community: issue-first + feature branch (collection) down to single-branch dumps (rahul, selcuk, deepank, Ursus).
- Missed opportunity: nobody uses branches as curriculum (`solution/*`, `exercise/*`, `level-1/*`). A practice repo should.

### README style (4 archetypes)
1. Install manual (official): badges, logo, Trailhead block, 3 deploy paths, tool setup, code tours. Great for deploy, zero teaching. 197-261 lines.
2. Catalog (collection, awesome-lwc, selcuk-index): component/link tables or syllabus lists. Collection does it best (icons, categories, attribute docs, catalog site). Awesome-lwc and selcuk are flat lists without freshness/level metadata.
3. Mentor essay (intro-to-lwc): prose + wiki + exercise stubs. Warm but fragile (external wiki, stale CLI links, wrong clone URL).
4. Template/dump (rahul-padded, cookbook-publisher, Ursus 5-liner, deepank 18-line default): boilerplate outweighs content or no content at all.
- Common gaps: no difficulty badges, no time estimates, no prerequisites matrix, no per-project demo GIFs (except collection screenshots), no social links beyond Trailhead/blog/Discord.

### Level coverage
- No repo labels beginner/intermediate/advanced consistently. Closest: selcuk LWC01-LWC18 numbering (implicit ramp), cookbook chapters (book-ordered), intro (beginner-only), lwc-utils/collection (advanced-only), recipes (breadth without path).
- Beginner: intro (prose), Ursus (Trailhead-gated), rahul (5 comps), selcuk LWC01-05, recipes hello*.
- Intermediate: recipes apex/wire/composition, selcuk LWC06-18, rahul cart, collection datatables, ebikes/dreamhouse apps.
- Advanced: recipes graphql/LMS/third-party, collection GraphQL/3D/Flows, lwc-utils SOQL/datatable/flow dialogs, ecars event-driven, cookbook LWS/perf/migration.
- Nobody provides exercises + solutions + tests per level. That is the gap.

### What they lack (checklist)
- Real-world scenarios: only ebikes/dreamhouse/ecars/rahul attempt end-to-end flows; recipes/collection/lwc-utils stay atomic; practice repos stop at TODO/calculator/datatable.
- Tests: real Jest in recipes (132), collection (29), ebikes (18); stub/placeholder Jest in selcuk (35 stubs) and deepank (22 incl. sum); zero in intro, lwc-utils, rahul, Ursus; cookbook 2 vs "70+ recipes" claim.
- CI: full (lint+test+deploy+packaging) only in official + collection. lwc-utils has PR lint/format only. Six repos have zero workflows.
- Deployment: one-click unlocked package only in recipes/dreamhouse; collection/others need CLI + org; ecars needs paid Heroku; intro needs manual manifest deploy; Ursus/cookbook/selcuk/deepank have no verified path.
- Discoverability/SEO/topics/social: official repos have 3-6 topics + homepage + badges + Trailhead funnel. Community falls off: cookbook 0 topics, deepank 0 topics + no description, intro/lwc-utils/rahul/selcuk no homepage or personal-site only, 5 repos no license, 6 on legacy `master`, no OpenGraph/social preview strategy in-repo, no per-project READMEs except collection.

### Why they are (not) highlighted
- Highlighted = distribution + trust: recipes (2,897) via Trailhead/sample-gallery/YouTube; salesforce/lwc (1,799) via framework; ebikes (846) via Experience Cloud showcase; dreamhouse (508) via brand age; lwc-utils (396) via practitioner word-of-mouth solving datatable pain; collection (306) via docs-site quality.
- Not highlighted = one or more of: classroom-coupled (selcuk), blog-coupled (rahul), book-coupled (cookbook), Trailhead-coupled with empty repo (Ursus), link-list without code (awesome-lwc), prose without code (intro), dump without docs (deepank). Each breaks the GitHub-native trust chain (topics, homepage, license, README, tests, CI, activity).

## Recommendations for a new practice repo (to beat the set)
1. Leveled curriculum in-repo: `beginner/`, `intermediate/`, `advanced/` with difficulty badges, time, prerequisites; numbered projects with real-world scenarios (not TODO-only).
2. Exercises + solution branches + Jest per project (no stub tests); `npm test` green on clone.
3. One-command deploy: scratch + DE + unlocked package; verified `sf` CLI flow, current API (66.0+).
4. README system: root catalog + per-project README with demo GIF, concepts, tasks, acceptance criteria; docs site optional but per-component docs mandatory (copy collection).
5. Discoverability: 5-8 topics (lightning-web-components, lwc, salesforce, sfdx, jest, sample-app), homepage, MIT/CC0 license, badges (CI, codecov), social preview image, changelog, CONTRIBUTING with topic-branch flow on `main`.
6. Practice mechanics nobody has: `exercise/*` vs `solution/*` branches, hidden tests option, self-check scripts, Trailhead-style badges/checklist in-repo.

## Evidence appendix (inspected paths/URLs)
- Clones: `/tmp/lwc-research/lwc-recipes`, `ebikes-lwc`, `dreamhouse-lwc`, `ecars`, `awesome-lwc`, `awesome-lwc-collection`, `intro-to-lwc`, `lwc-utils`, `Salesforce-Lightning-Web-Component-Cookbook`, `rahulgawale_lwc-e-commerce-recipe`, `selcukgoktas_SalesforceDeveloperTraining`, `deepank99_KFP`, `trailheadapps_build-apps-with-lwc`, `lwc`.
- READMEs read (full head + headings + line counts): each `README.md` above; aggregates in `/tmp/lwc-research/_readmes.txt`.
- Structure/CI/tests: `force-app/main/default/lwc/` listings, `sfdx-project.json`, `package.json`, `.github/workflows/`, `jest.config.js`, `__tests__` counts; aggregate in `/tmp/lwc-research/_struct.txt`.
- Key source files opened: `lwc-recipes/.../compositionBasics/*`, `hello/*`; `ebikes-lwc/.../productFilter/__utam__/productFilter.utam.json`; `awesome-lwc-collection/.../customDatatable/README.md`; `intro-to-lwc/.../item/item.js`; `lwc-utils/utils-core/main/default/lwc/` + `utils-recipes/...` listings; `rahulgawale_.../productTile/productTile.js`; `selcukgoktas_.../lwc14_SimpleTODO/lwc14_SimpleTODO.js` + stub test `navigationMenu.test.js`; `deepank99_KFP/.../toDoManager/toDoManager.js` + placeholder `sum` test; `Salesforce-Lightning-Web-Component-Cookbook/force-app/chapter*/` listings.
- Metadata: GitHub API `api.github.com/repos/<owner>/<repo>` for all 14 (stars/forks/issues/description/topics/homepage/dates/license/default_branch) via curl; web_search for lwc-recipes, trailheadapps samples, awesome-lwc, community practice repos.
- Report path: `/tmp/lwc-research/similar-repos.md` (this file).
