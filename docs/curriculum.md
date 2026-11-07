# PracticeLWC: 35-Project Curriculum

Date: 2026-11-07. API target: v67 (Summer 26), user mode + `with sharing` Apex throughout.
Research inputs: `/tmp/lwc-research/business-scenarios.md` (B1-B3/I1-I3/A1-A3/R1-R3),
`/tmp/lwc-research/latest-docs.md` (v65/v66/v67 deltas), `/tmp/lwc-research/similar-repos.md`
(14-repo gap analysis), `/tmp/lwc-research/repo-state.md` (practicelwc bootstrap).

Design rules (from gap analysis): leveled path + real scenarios + real Jest per project
(no stub tests) + CI + one-command deploy + per-project README + exercise/solution
branches. Every project ships `__tests__` green on clone. No `data:` downloads,
no `WITH_SECURITY_ENFORCED`, no Aura wrappers, no session-ID auth, no Experience
Delivery content, no `.ts` shipped to org.

## Root SFDX layout

```text
practicelwc/
  README.md  LICENSE  CONTRIBUTING.md  CHANGELOG.md
  sfdx-project.json              # sourceApiVersion 67.0, single package dir force-app
  package.json                   # scripts: lint, test:unit, test:watch, prettier:verify
  jest.config.js  jest-sa11y-setup.js  eslint.config.js  .prettierrc
  config/project-scratch-def.json
  docs/
    setup.md  branching.md  testing.md  offline.md  troubleshooting.md
    level-1-beginner.md  level-2-intermediate.md  level-3-advanced.md  level-4-architect.md
    projects/01-hello-lead-card/README.md ... (one per project, copied pattern)
  force-app/main/default/
    lwc/                         # flat bundles, lowerCamelCase; shared: utilsLib, errorPanel, emptyState
    classes/  triggers/  objects/  flexipages/  flows/  messageChannels/
    permissionsets/  staticresources/  tabs/  applications/
  force-app/test/jest-mocks/     # shared wire/Apex mocks (copy awesome-lwc-collection pattern)
  manifest/package.xml  scripts/apex/  scripts/soql/
  .github/workflows/ci.yml       # prettier + eslint (incl. LWS rules) + jest + scratch deploy
  images/social-preview.png  images/demo/*.gif
```

## Shared utils (built once, reused by all projects)

- `utilsLib` (LWC service module): toast helpers, `reduceErrors` error normalize,
  debounce, CSV builder via `Blob` + `URL.createObjectURL` (LWS-clean), currency/date
  formatters using complex-expression-safe getters.
- `errorPanel`: inlineMessage + noDataIllustration templates (dreamhouse pattern),
  wraps `lightning-illustration`.
- `emptyStateWrap`: thin wrapper over `lightning-empty-state` with illustration variants.
- `stateStore`: Summer 26 LWC State Management singleton used from project 14 onward.
- `ldsUtils`: `getRecord` field-list builders (offline-safe, never by-layout).
- Apex `SecurityBase`: `with sharing`, user-mode SOQL/DML, no `WITH_SECURITY_ENFORCED`;
  `TestDataFactory` for all Apex tests.

## Branching strategy

```text
project/<nn>-<slug>  -->  level/<n>-<name>  -->  develop  -->  main (protected)
exercise/<nn>-<slug> (starter, TODOs + failing tests) --- solution in project/* branch
```

- `main` (protected, default): always deployable; PR from `develop` only, green CI;
  tag `level-N-complete` per finished level.
- `develop` (protected): integration; PRs from `level/*`.
- `level/1-beginner`, `level/2-intermediate`, `level/3-advanced`, `level/4-architect`
  (long-lived): hold that level's projects.
- `project/<nn>-<slug>`: one per project below, cut from its level branch.
- `exercise/<nn>-<slug>`: starter code with TODOs + red tests; learners PR into it,
  compare against `project/*` solution.
- Legacy `master/barcelona/pawankalyan/multiSelectPickList` retire after migration
  into `develop` (see repo-state.md bootstrap); scrub hardcoded org id first.

## README outline (root + per-project)

Root README: badges row (CI, Codecov, Sonar, API v67, license) -> hero GIF ->
one-paragraph pitch -> interactive mermaid journey map (clickable level nodes) ->
curriculum table (35 rows: # / title / level / time / prereqs / demo link) ->
3-path quickstart (scratch recommended / DE / unlocked package) -> testing pyramid
(Jest + UTAM diagram) -> motion: embedded demo GIFs per level + collapsible
`<details>` accordions per project -> contributing + CLA -> license + credits.
Per-project `docs/projects/<nn>-<slug>/README.md`: badges (level, time, API),
business scenario, persona, concepts table, tasks checklist, acceptance criteria,
stretch goals, demo GIF, solution-branch link.

---

## Level 1 - Beginner (Projects 1-9)

### 1. Hello Lead Card
- Business scenario: B1 web-to-lead; rep needs a friendly lead greeting card on Home.
- Persona: SDR at SMB home-improvement seller.
- Objects/Apex: Lead (read-only via LDS); no Apex.
- LWC features: `hello`-style template, `@api recordId`, `getRecord` + `getFieldValue`,
  `lightning-card`, `lightning-illustration` fallback, complex expression (`??`
  greeting default, Beta-flagged).
- Acceptance: renders Lead name or illustration fallback; Jest: name + fallback cases.
- Branch: `project/01-hello-lead-card`
- Folder: `force-app/main/default/lwc/helloLeadCard`

### 2. Lead Worklist Table
- Business scenario: B1; SDR triages new web leads in a sortable table.
- Persona: SDR / inside sales rep.
- Objects/Apex: Lead, Task; cacheable Apex `LeadController.getNewLeads` (user mode).
- LWC features: `@wire` Apex, `lightning-datatable` with row actions (convert, new task),
  `refreshApex`, `ShowToastEvent`, `lightning-empty-state` when queue is clear.
- Acceptance: row action creates Task + toast; empty queue shows empty-state; Jest mocks wire.
- Branch: `project/02-lead-worklist-table`
- Folder: `force-app/main/default/lwc/leadWorklistTable`

### 3. Lead Convert Form
- Business scenario: B1; one-click lead conversion with account/contact preview.
- Persona: SDR.
- Objects/Apex: Lead, Account, Contact; Apex `LeadConvertService` (user mode, tested).
- LWC features: `lightning-record-edit-form`, imperative Apex call, NavigationMixin
  `Navigate` to converted Account, error handling via `errorPanel`.
- Acceptance: converts lead, navigates to Account, shows toast; Apex test covers dupes.
- Branch: `project/03-lead-convert-form`
- Folder: `force-app/main/default/lwc/leadConvertForm`

### 4. Knowledge Self-Help Finder
- Business scenario: B2; customer types a question, gets articles, escalates only if stuck.
- Persona: Customer + support agent.
- Objects/Apex: Knowledge__kav, Case; cacheable `KnowledgeSearchController.search`.
- LWC features: `@wire` + imperative refresh on keystroke (debounced via `utilsLib`),
  `lightning-accordion` article viewer, LMS publisher of search term, `lwc:on`
  dynamic handlers for result actions (GA v66 pattern).
- Acceptance: debounce fires once; article expand works; LMS message received by case
  composer stub; Jest covers debounce + empty results.
- Branch: `project/04-knowledge-finder`
- Folder: `force-app/main/default/lwc/knowledgeFinder`

### 5. Case Creator with Attachments
- Business scenario: B2 escalation path; create Case with file upload from finder term.
- Persona: Customer.
- Objects/Apex: Case, ContentDocument; `createRecord` + `lightning-file-upload`.
- LWC features: LMS subscriber (search term prefill), `createRecord`, file upload,
  `lightning-record-form` confirm view, nav-to-record after save.
- Acceptance: term prefilled from LMS; Case created with attachment; Jest mocks LMS + LDS.
- Branch: `project/05-case-creator-attachments`
- Folder: `force-app/main/default/lwc/caseCreator`

### 6. Project Intake Wizard
- Business scenario: B3 donation/fit-out intake; replace email+spreadsheet intake.
- Persona: Operations coordinator.
- Objects/Apex: Project__c, Contact; `createRecord` only, no Apex.
- LWC features: multi-step wizard (progress indicator, conditional rendering),
  custom validation per step, `lightning-file-upload`, Navigate to new record,
  complex expressions for step visibility.
- Acceptance: cannot advance with invalid step; record created; file attached; Jest
  walks all steps incl. back-navigation.
- Branch: `project/06-project-intake-wizard`
- Folder: `force-app/main/default/lwc/projectIntakeWizard`

### 7. Dynamic Event Playground (`lwc:on`)
- Business scenario: B3 follow-up; coordinator toggles edit/preview modes on intake list.
- Persona: Operations coordinator.
- Objects/Apex: Project__c via `getRecords`; no Apex.
- LWC features: **`lwc:on` event-map switching** (replaces if:true handler chains),
  `getRecords`, inline edit vs preview modes, `lightning-empty-state`.
- Acceptance: mode toggle rewires handlers with no template duplication; Jest asserts
  both handler maps fire.
- Branch: `project/07-dynamic-event-playground`
- Folder: `force-app/main/default/lwc/eventPlayground`

### 8. Record Header Widgets
- Business scenario: B1/B2; at-a-glance SLA + health widgets on Lead/Case headers.
- Persona: SDR + support agent.
- Objects/Apex: Lead, Case; `getRecord` explicit fields.
- LWC features: `lightning-record-view-form`, App Builder design attributes
  (`@api` config props + descriptions for Agentforce discoverability), SLDS styling
  hooks, `lightning-illustration` for no-data.
- Acceptance: drops on any record page via Builder; props documented; Jest per prop.
- Branch: `project/08-record-header-widgets`
- Folder: `force-app/main/default/lwc/recordHeaderWidgets`

### 9. Download Center (LWS-clean files)
- Business scenario: B3; coordinator exports intake list as CSV.
- Persona: Operations coordinator.
- Objects/Apex: Project__c; cacheable `ProjectController.getProjects`.
- LWC features: **`blob:` CSV download** (`URL.createObjectURL`, never `data:`),
  LWS ESLint rules passing, `lightning-datatable` + `lightning-empty-state`.
- Acceptance: CSV downloads with correct MIME; LWS lint clean; Jest asserts
  `createObjectURL` path (contrast note: `data:` fails silently at v67).
- Branch: `project/09-download-center`
- Folder: `force-app/main/default/lwc/downloadCenter`

---

## Level 2 - Intermediate (Projects 10-18)

### 10. Discount Eligibility Checker
- Business scenario: I1; rep checks discount eligibility before quoting.
- Persona: Sales rep.
- Objects/Apex: Opportunity, Account; imperative `DiscountService.checkEligibility`.
- LWC features: imperative Apex with `{ data, errors }` handling, instant message UI,
  `ShowToastEvent`, Jest Apex mocks (eligible/ineligible/error).
- Acceptance: shows rule breakdown; ineligible blocks with reason; Apex tests all rules.
- Branch: `project/10-discount-checker`
- Folder: `force-app/main/default/lwc/discountChecker`

### 11. Approval Inbox
- Business scenario: I1; manager approves/rejects discount requests with audit trail.
- Persona: Sales manager + finance approver.
- Objects/Apex: Approval_Request__c / ProcessInstance; `ApprovalService` approve/reject.
- LWC features: `lightning-datatable` inbox, `lightning-modal` approve/reject with
  comments, `empApi` platform-event refresh on new requests, `refreshApex`.
- Acceptance: approve/reject posts comments + toast; new request arrives live via
  platform event; Jest covers modal + event handler.
- Branch: `project/11-approval-inbox`
- Folder: `force-app/main/default/lwc/approvalInbox`

### 12. GraphQL Opportunity Explorer
- Business scenario: I1; rep browses opps + line items + account in one view.
- Persona: Sales rep.
- Objects/Apex: Opportunity, OpportunityLineItem, Account; **no Apex** (GraphQL reads).
- LWC features: **`@wire(graphql)` from `lightning/graphql`** (v2 online), relational
  query (1 round trip vs N wires), `refreshGraphQL`, `lightning-tree-grid`.
- Acceptance: single query renders tree; refresh after edit; Jest mocks graphql adapter.
- Branch: `project/12-graphql-opportunity-explorer`
- Folder: `force-app/main/default/lwc/graphqlOppExplorer`

### 13. GraphQL Mutations: Inline Opp Editor
- Business scenario: I1; rep edits opp + line items inline without Apex round trips.
- Persona: Sales rep.
- Objects/Apex: Opportunity, OpportunityLineItem; **no Apex** (`executeMutation`).
- LWC features: **`executeMutation` create/update/delete** with `errors?.length`
  checks (no child relationships in selections), `refreshGraphQL` after writes.
- Acceptance: edit/delete round-trips with no Apex; errors surface via toast;
  Jest covers `{ data, errors }` branches incl. non-empty errors array.
- Branch: `project/13-graphql-mutations-editor`
- Folder: `force-app/main/default/lwc/graphqlOppEditor`

### 14. Shared Cart State (State Management)
- Business scenario: I1/I3; line-item list + opportunity summary stay in sync.
- Persona: Sales rep + partner portal user.
- Objects/Apex: Opportunity, OpportunityLineItem; `stateStore` shared object.
- LWC features: **LWC State Management (GA v67)** shared state between sibling
  components; replaces event ping-pong + refetch; single source of truth.
- Acceptance: edit in list updates summary with zero server refetch; Jest asserts
  shared-object sync across both components.
- Branch: `project/14-shared-cart-state`
- Folder: `force-app/main/default/lwc/sharedCartState`

### 15. Agent Console Workspace
- Business scenario: I2; 360-degree console: header + timeline + knowledge + macros.
- Persona: Contact-center agent.
- Objects/Apex: Case, Contact, Account, Knowledge; `MacroService` quick actions.
- LWC features: LMS across console siblings, console navigation APIs
  (`openTab`, `focusTab`), custom timeline component, utility-bar widget,
  SLA countdown header.
- Acceptance: tab components sync via LMS; macro executes + logs Task; Jest per widget.
- Branch: `project/15-agent-console-workspace`
- Folder: `force-app/main/default/lwc/agentConsoleWorkspace`

### 16. Partner Portal Dashboard
- Business scenario: I3; partner sees cases, proposals, files, approvals.
- Persona: Partner sales rep.
- Objects/Apex: Account, Case, Project_Proposal__c, ContentDocument;
  `with sharing` portal-safe Apex + sharing sets.
- LWC features: Experience Builder-exposed LWC, `lightning-breadcrumb` nav,
  file list + preview, Flow launched from LWC button, guest/sharing-safe queries.
- Acceptance: deploys to Experience site; sharing verified (no leakage across
  accounts); Jest + Apex sharing tests.
- Branch: `project/16-partner-portal-dashboard`
- Folder: `force-app/main/default/lwc/partnerPortalDashboard`

### 17. Flow Handoff: Quote-to-Approval Flow
- Business scenario: I1; rep jumps from opp record into a screen flow with context.
- Persona: Sales rep.
- Objects/Apex: Opportunity, Approval_Request__c; screen flow + local action.
- LWC features: **nav-to-flow one-liner** (`standard__flow` + `flow__`-prefixed
  state) + **LWC local flow action** (`lightning__FlowAction`) for client-side
  discount math with no server round trip.
- Acceptance: flow opens prefilled; local action computes without Apex call;
  Jest covers action input/output contract.
- Branch: `project/17-flow-handoff`
- Folder: `force-app/main/default/lwc/flowHandoff`

### 18. Notification Center (Custom Notifications)
- Business scenario: I1/I2; approvers + agents get in-app + push notifications.
- Persona: Sales manager + agent.
- Objects/Apex: CustomNotificationType; Apex send via `Messaging.CustomNotification`.
- LWC features: `lightning-emp-api` live badge, custom notification bell,
  `lightning-modal` detail view, `lwc:on` for per-type handlers.
- Acceptance: notification arrives live, badge increments, deep-links to record;
  Jest covers event-to-badge wiring.
- Branch: `project/18-notification-center`
- Folder: `force-app/main/default/lwc/notificationCenter`

---

## Level 3 - Advanced (Projects 19-27)

### 19. CPQ Lite: Guided Selling Wizard
- Business scenario: A1; AE configures bundles with pricing rules + approvals.
- Persona: AE / quoting specialist (manufacturing).
- Objects/Apex: Quote, QuoteLineItem, Product2, Pricebook2, Pricing_Rule__c;
  `PricingEngine` (user mode).
- LWC features: parent orchestrator + child line-item editors via `stateStore`
  + LMS, `lightning-tree-grid` bundles, dynamic price-book/currency picklists
  (`getPicklistValues`), Advanced Approval handoff.
- Acceptance: rules price a 3-tier bundle correctly; unapproved discount blocks;
  Jest + Apex rule-matrix tests.
- Branch: `project/19-cpq-lite-wizard`
- Folder: `force-app/main/default/lwc/cpqLiteWizard`

### 20. Quote PDF + Branded Delivery
- Business scenario: A1; one-click branded quote PDF emailed to customer.
- Persona: AE.
- Objects/Apex: Quote, ContentDocument; schedulable + invocable `QuotePdfService`.
- LWC features: Flow + template PDF trigger from LWC button, `blob:` preview
  download, `lightning-empty-state` while generating, nav-to-flow status screen.
- Acceptance: PDF generated + attached + emailed; preview downloads LWS-clean;
  Apex tests cover scheduling + email.
- Branch: `project/20-quote-pdf-delivery`
- Folder: `force-app/main/default/lwc/quotePdfDelivery`

### 21. Field Service Day Planner
- Business scenario: A2; dispatcher views route/day schedule on a map.
- Persona: Dispatcher.
- Objects/Apex: WorkOrder, ServiceAppointment, ServiceResource; `SchedulingService`.
- LWC features: `lightning-map` route/day view, drag-to-reschedule (collection
  dragAndDrop pattern), `empApi` live status, `refreshGraphQL` on change.
- Acceptance: reschedule persists + map updates; tech status arrives live;
  Jest covers drag + event paths.
- Branch: `project/21-field-day-planner`
- Folder: `force-app/main/default/lwc/fieldDayPlanner`

### 22. Offline Technician App
- Business scenario: A2; tech completes work orders offline with photos + signature.
- Persona: Mobile field technician.
- Objects/Apex: WorkOrder, WorkOrderLineItem, Asset, Equipment_Check__c; no Apex
  offline (queued drafts + sync).
- LWC features: **offline-first track**: statically analyzable LWC,
  `lightning/uiGraphQLApi` (v1, NOT v2) + explicit-field `getRecord`,
  Briefcase Builder config (limits documented: 50K/object, 5 briefcases, 10 rules,
  3 levels), SmartStore drafts, conflict-resolution UX, camera + signature capture.
- Acceptance: works airplane-mode end-to-end; syncs + resolves conflict on reconnect;
  Jest covers queue + conflict branches.
- Branch: `project/22-offline-technician-app`
- Folder: `force-app/main/default/lwc/offlineTechApp`

### 23. Realtime Ops Dashboard
- Business scenario: A3; capacity planner drills into live telemetry charts.
- Persona: Capacity planner / ops analyst.
- Objects/Apex: Transponder_Group__c-style telemetry; cacheable aggregated Apex,
  schedulable PDF email snapshot.
- LWC features: D3/Chart.js via static resource in **Trusted Mode** (warned,
  dedicated sample), `lwc:dom="manual"`, lazy-load + pagination, dynamic grouping.
- Acceptance: renders 10K-point chart under budget; scheduled PDF email works;
  Trusted Mode warning doc present; Jest covers data-transform layer.
- Branch: `project/23-realtime-ops-dashboard`
- Folder: `force-app/main/default/lwc/opsDashboard`

### 24. TypeScript LWC: Typed Data Grid
- Business scenario: A3; ops team needs a type-safe reusable grid.
- Persona: Ops analyst + platform dev.
- Objects/Apex: Any SObject via `uiObjectInfoApi`; cacheable generic Apex.
- LWC features: **TypeScript-authored LWC (Developer Preview)**: `.ts` + compile-to-JS
  (deploy JS only), `@salesforce/lightning-types` casts for `event.target`,
  complex expressions in template.
- Acceptance: `tsc` clean; deployed bundle is JS-only; typed event handling;
  Jest unchanged (runs against compiled JS); README flags Preview status.
- Branch: `project/24-typescript-data-grid`
- Folder: `force-app/main/default/lwc/typedDataGrid`

### 25. SSR-Ready Product Catalog (LWR)
- Business scenario: I3/A3; public indexable product catalog on Experience Cloud.
- Persona: Customer (guest) + SEO.
- Objects/Apex: Product2, PricebookEntry; cacheable Apex.
- LWC features: **SSR-safe + islands SSR**: light DOM, guarded `window`/`document`,
  no `renderedCallback` server logic, `hydrateComponent`, `ServerRenderable` gate,
  SSR+CSR Jest via `lwc-test`. (No Experience Delivery: discontinued Oct 2026.)
- Acceptance: SSR HTML matches CSR (no hydration mismatch error); Lighthouse SEO
  pass; Jest green in both SSR and CSR modes.
- Branch: `project/25-ssr-product-catalog`
- Folder: `force-app/main/default/lwc/ssrProductCatalog`

### 26. UTAM E2E Track: Quote-to-Cash Journey
- Business scenario: A1 end-to-end; automated UI coverage for guided quote flow.
- Persona: QA / release engineer.
- Objects/Apex: reuses projects 19-20 metadata; no new Apex.
- LWC features: **UTAM page objects** (`*.utam.json`) for wizard + approval inbox,
  `data-*`/`aria-*` locators (no CSS/XPath-first), wdio run, 10-20 journeys max.
- Acceptance: `test:ui` passes quote-to-approval journey headless; page objects
  decoupled from shadow DOM; CI runs UTAM lane.
- Branch: `project/26-utam-e2e-track`
- Folder: `force-app/main/default/lwc/__utam__` (+ `utam.config.js`, `wdio.conf.js`)

### 27. Secure File Hub (LWS Hardening)
- Business scenario: A1/A3; hub for quote PDFs + telemetry exports with audit.
- Persona: Finance approver + ops analyst.
- Objects/Apex: ContentDocument; user-mode `FileHubService`.
- LWC features: LWS ESLint rules enforced, `blob:` downloads, no `innerHTML`
  (uses `lwc:dom="manual"` + textContent), MutationObserver-free reactivity,
  Trusted Mode boundary doc for the one D3 widget.
- Acceptance: `npm run lint` (incl. LWS rules) clean; penetration checklist in
  README passes; Jest covers sanitize paths.
- Branch: `project/27-secure-file-hub`
- Folder: `force-app/main/default/lwc/secureFileHub`

---

## Level 4 - Architect / Capstone (Projects 28-35)

### 28. Multi-Brand Identity + Consent Console
- Business scenario: R1; privacy officer manages consent across brands at scale.
- Persona: Platform architect + privacy officer.
- Objects/Apex: Account, Contact, Consent__c, Identity_Event__c; user-mode APIs.
- LWC features: CSP-safe admin console, granular consent toggles, Shield event-log
  viewer, per-brand data segregation guards, `executeMutation` consent writes.
- Acceptance: consent change audits to Identity_Event__c; brand B admin cannot see
  brand A data (Apex sharing tests); Jest covers toggle matrix.
- Branch: `project/28-identity-consent-console`
- Folder: `force-app/main/default/lwc/identityConsentConsole`

### 29. EX-Rated Offline Workbench
- Business scenario: R2; hazardous-zone equipment checks offline + PI Vision trending.
- Persona: Field technician (EX zones) + reliability engineer.
- Objects/Apex: Equipment_Check__c, Parameter_Reading__c; sync `CheckSyncService`.
- LWC features: offline-first (project 22 pattern at scale), threshold/alerting
  components, embedded external telemetry view (CSP allowlist), upgrade-safe
  extension points, Briefcase config for 50K readings.
- Acceptance: offline readings queue + trend sync; threshold breach raises Case;
  Jest covers threshold + sync-conflict logic.
- Branch: `project/29-offline-workbench`
- Folder: `force-app/main/default/lwc/offlineWorkbench`

### 30. Omnichannel Support Hub
- Business scenario: R3; dynamic-sharing hub unifying bot, console, portal.
- Persona: Enterprise architect + agent.
- Objects/Apex: Lead, Case, Community_Activity__c; Flow + Apex routing services.
- LWC features: Einstein Bot handoff component, LMS across bot/console/portal,
  portal behavior-analytics instrumentation, CRM Analytics embed (deal intelligence),
  dynamic record-sharing admin tooling.
- Acceptance: bot triage routes + credits referral; hub respects dynamic sharing;
  Jest + Flow tests cover routing matrix.
- Branch: `project/30-omnichannel-hub`
- Folder: `force-app/main/default/lwc/omnichannelHub`

### 31. LWC Beyond Salesforce (Lightning Out 2.0)
- Business scenario: R1/R3; embed consent widget + deal-risk card in external web app.
- Persona: B2B app team dev.
- Objects/Apex: Consent__c, Opportunity; OAuth-secured reads.
- LWC features: **Lightning Out 2.0**: `<lightning-out-application>` declarative tag,
  OAuth 2.0 `/services/oauth2/singleaccess` (opaque tokens), External Client App
  (`web` scope), CORS allowlist, SLDS styling-hook overrides. No Aura, no session ID.
- Acceptance: widget renders in plain HTML host with auth; guest blocked (by design);
  E2E smoke script in `scripts/` passes.
- Branch: `project/31-lightning-out-embed`
- Folder: `force-app/main/default/lwc/lo2Embed` (+ `sites/lo2-demo/index.html`)

### 32. Release-Gated Feature Lab
- Business scenario: R3; team previews upcoming LWC features safely per channel.
- Persona: Release engineer.
- Objects/Apex: none new; scratch-def + CI config work.
- LWC features: Release Manager Standard/preview channels (Beta), Component Preview
  GA workflow, HMR loop demo, grouped `<details>` zero-JS accordions, Error Console
  triage runbook.
- Acceptance: preview-channel scratch validates one Beta feature with rollback notes;
  Error Console runbook resolves a seeded non-fatal error; docs-only + 1 demo LWC.
- Branch: `project/32-release-feature-lab`
- Folder: `force-app/main/default/lwc/featureLab`

### 33. Capstone A: Lead-to-Cash (Sales)
- Business scenario: B1 + I1 + A1 combined: web lead -> opp -> guided quote -> approval -> PDF.
- Persona: SDR -> AE -> manager (full sales pod).
- Objects/Apex: composes projects 2, 3, 10, 11, 13, 19, 20; no new objects.
- LWC features: `stateStore` across worklist/editor/wizard, `executeMutation` writes,
  `refreshGraphQL` sync, nav-to-flow approval, UTAM journey extension.
- Acceptance: one demo script runs lead-to-PDF in under 10 minutes on a scratch org;
  full Jest + UTAM green; architecture diagram (mermaid) in README.
- Branch: `project/33-capstone-lead-to-cash`
- Folder: `docs/capstones/lead-to-cash` (+ wiring flexipage)

### 34. Capstone B: Case-to-Resolution (Service)
- Business scenario: B2 + I2 + A2 + R2 combined: self-help -> case -> console -> field fix.
- Persona: Customer -> agent -> dispatcher -> technician.
- Objects/Apex: composes projects 4, 5, 15, 21, 22; no new objects.
- LWC features: LMS thread from finder to console to field app, offline field leg,
  empApi live updates, notification center wiring, UTAM journey extension.
- Acceptance: one demo script runs question-to-field-resolution incl. offline leg;
  Jest + UTAM green; mermaid sequence diagram in README.
- Branch: `project/34-capstone-case-to-resolution`
- Folder: `docs/capstones/case-to-resolution` (+ wiring flexipage)

### 35. Capstone C: Portal-to-Insight (Platform)
- Business scenario: I3 + A3 + R1 + R3 combined: portal -> consent -> telemetry -> dashboard.
- Persona: Partner -> privacy officer -> ops analyst.
- Objects/Apex: composes projects 16, 23, 25, 28, 30; no new objects.
- LWC features: SSR catalog front door, consent-gated portal, ops dashboard with
  Trusted-Mode charts, Lightning Out 2.0 external widget, full CI + packaging.
- Acceptance: unlocked-package install verified; portal + SSR + Out 2.0 all live from
  one package version; Jest + UTAM green; README has badges + mermaid + demo video.
- Branch: `project/35-capstone-portal-to-insight`
- Folder: `docs/capstones/portal-to-insight` (+ packaging config)

---

## Build order + dependencies

1-9 sequential (shared utils land in 1-2). 10-11, 12-13, 14-16 parallel pairs.
17-18 after 10-11. 19-20 after 12-14. 21-22 after 15. 23-27 after 19-22.
28-32 after 16 + 22 + 23. 33 after 19-20. 34 after 15 + 22. 35 after 28 + 30 + 31.
Every project: cut `exercise/*` starter first, then `project/*` solution; CI must
stay green on `develop` throughout.

