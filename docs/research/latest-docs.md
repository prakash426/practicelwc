# LWC Latest Docs Research (2025–2026)

Researched: 2026-11-07. Scope: Winter '26 (API v65) → Spring '26 (API v66) → Summer '26 (API v67), with Winter '27 (API v68) retirement notes where confirmed.
Audience: authors of new LWC sample code. Goal: what new samples must demo, and which old patterns to avoid.

Evidence note: `developer.salesforce.com` and `help.salesforce.com` pages returned HTTP 403 to the
fetcher, so official-blog/doc claims below are corroborated via (a) search-result snippets of those
official pages and (b) fully inspected secondary bodies that quote them. Sources are graded per
section (Inspected body vs Snippet-only).

---

## 1. Release map

| Release | API | Dates | LWC headline items |
|---|---|---|---|
| Winter '26 | v65 | Sandboxes Sep 2025, prod Oct 2025 | `lightning/graphql` module (GA, reads + optional fields), Lightning Out 2.0 GA, LWS Trusted Mode, LWC as local actions in screen flows (`lightning__FlowAction`), Local Dev single-component preview w/ LDS + Apex |
| Spring '26 | v66 | Sandboxes Jan, prod Feb 2026 | `lwc:on` dynamic events (GA), GraphQL mutations `executeMutation` (GA), complex template expressions (Beta), TypeScript types rollout complete (`@salesforce/lightning-types`, still Developer Preview), `lightning-empty-state` + `lightning-illustration`, nav-to-flow one-liner, Error Console |
| Summer '26 | v67 | Preview May, prod Jun 2026 | LWC State Management GA, grouped `<details>` zero-JS accordions, faster HMR, LWC Component Preview GA, LWS new distortion batch (blocks `data:` URIs), Release Manager channels (Beta), Apex secure-by-default (user mode, `with sharing` default, `WITH_SECURITY_ENFORCED` deprecated) |
| Winter '27 | v68 | Rollout Sep–Oct 2026 | Experience Delivery (Beta) discontinued; standard LWR + islands SSR remains. LWS `data:` block enforced everywhere |

---

## 2. LWC API latest (what changed per release)

### Winter '26 (API v65)
- **New `lightning/graphql` module** for the GraphQL API, incl. support for **optional fields**.
  Snippet: Winter '26 developer guide.
- **Lightning Out 2.0 GA** (see §8). No Aura wrapper needed; pure LWC via `<lightning-out-application>`.
  Inspected: SalesforceBen Lightning Out 2.0 article; SalesforceCodex Winter '26 roundup.
- **LWC Trusted Mode** for third-party scripts (see §3).
- **LWC as local actions in screen flows** via `lightning__FlowAction`: client-side logic, no server round-trip.
  Snippet: Winter '26 developer guide + copyprogramming roundups (consistent across 3+ snippets).
- **Local Dev single-component preview (Beta)** now supports LDS wire adapters, `@salesforce` scoped modules, and Apex controllers.
  Snippet: Winter '26 developer guide.

### Spring '26 (API v66)
- **`lwc:on` directive (GA).** Pass a plain JS object mapping event names → handlers; LWC rewires
  listeners when the object reference changes. Kills `if:true` handler-switch templates and manual
  `addEventListener/removeEventListener` in `renderedCallback`.
  Inspected: DianApps Spring '26 guide (full code sample, cites LWC Recipes PR #1081); S2-Labs Spring '26.
- **GraphQL mutations (GA): `executeMutation` from `lightning/graphql`.** Imperative create/update/
  delete without Apex. Returns `{ data, errors }` where `errors` is an **array** — always check
  `errors?.length`. Child relationship fields NOT supported in mutation response selections.
  Pair deletes with `refreshGraphQL(wireResult)` to refresh `@wire(graphql)` reads.
  Inspected: DianApps (create/update/delete samples, cites LWC Recipes PR #1083); S2-Labs.
- **Complex template expressions (Beta).** Template literals, ternaries, optional chaining,
  nullish coalescing, array methods, inline arrow handlers directly in HTML — no boilerplate getters.
  Beta terms: syntax may change before GA; sandbox-only for now.
  Inspected: DianApps; dev.to TypeScript article; S2-Labs.
- **New base components: `lightning-empty-state`, `lightning-illustration`** (SLDS illustration
  library, dark-mode aware, zero custom CSS).
  Inspected: DianApps (markup samples).
- **Navigate to flows:** `NavigationMixin` + `standard__flow` PageReference + `flowApiName`; pass
  inputs via `state` keys prefixed `flow__`.
  Inspected: DianApps (cites LWC Recipes PR #1082).
- **Error Console:** silent logging of non-fatal errors to a panel (Setup → User Interface →
  Advanced Settings → "Use Error Console…"); fatal errors captured too.
  Inspected: DianApps.
- **LWCs discoverable by Agentforce for Setup:** provide component + property descriptions so
  agents can configure pages.
  Inspected: S2-Labs.

### Summer '26 (API v67)
- **LWC State Management (GA).** Shared state-manager object between components on a page —
  replaces event-ping-pong + server refetch for cross-component sync (e.g. line-item list +
  opportunity summary). Fewer round trips, single source of truth.
  Inspected: SalesforceBen Top-8 Summer '26 (cites `rn_lwc_state_management_ga`).
- **Grouped `<details>` zero-JS accordions + faster hot reload (HMR).**
  Snippet: Summer '26 developer guide.
- **LWC Component Preview GA at 67.0.**
  Snippet: GitHub myLearning PHASES notes.
- **Salesforce Release Manager (Beta opt-in):** Standard / preview channels to test upcoming
  LWC features early.
  Inspected: SalesforceBen Top-8 Summer '26.
- **Apex secure-by-default (affects every LWC calling Apex):** DB ops default to **user mode**,
  classes with no sharing declaration default to **`with sharing`**, triggers always run in
  system mode, **`WITH_SECURITY_ENFORCED` deprecated** in favor of explicit user/system mode.
  Test all `@AuraEnabled` calls when bumping API version.
  Inspected: SalesforceBen Top-8 Summer '26 (cites rn_apex_* release notes).

---

## 3. Lightning Web Security (LWS)

- LWS is the standard sandbox (default-on for new orgs since Winter '23; Locker-era APIs are legacy).
  Follow the "Build Components to Work With LWS" coding guidelines.
  Snippet: LWC Security Guide (`lws-build-components`).
- **Trusted Mode (Winter '26, GA track):** runs designated third-party scripts (analytics, jQuery,
  D3-class libs needing global context) with elevated permissions — unrestricted browser APIs,
  full DOM/shadow-DOM access, no namespace isolation. Trade-off is explicit: **Salesforce security
  protections no longer apply to those scripts.** Use only for code you trust.
  Inspected: SalesforceCodex Winter '26; Snippet: JS-dev cert maintenance Summer '26 (Trailhead).
- **Summer '26 / API v67 distortion batch (BREAKING):** `HTMLAnchorElement.prototype.href` **blocks
  the `data:` URI scheme**; also new distortions around `innerHTML` getters and
  `MutationObserver.observe`, with matching **ESLint rules** to catch violations at author time.
  Fix: build downloads with `URL.createObjectURL(blob)` + explicit MIME type, never `data:`.
  A `data:` href fails **silently**.
  Snippet: Summer '26 developer guide ("Secure file downloads: LWS blocks `data:` URIs"),
  sfdc.rocks Release Radar, two GitHub SKILL references (consistent).
- Workflow: install LWS ESLint rules, test components with LWS enabled before shipping.
  Snippet: LWS test-workflow doc.

---

## 4. Lightning Data Service / wire adapters / GraphQL

- Core LDS adapters unchanged: `getRecord`, `getRecords`, `getFieldValue` (`lightning/uiRecordApi`),
  `getObjectInfo`/`getPicklistValues` (`lightning/uiObjectInfoApi`), `getRelatedListRecords/Count`
  (`lightning/uiRelatedListApi`), `lightning-record-form` family.
- **GraphQL module split (important for samples):**
  - NEW online development → **`lightning/graphql`** (v2): `@wire(graphql, …)` reads +
    `executeMutation` writes (Spring '26 GA). Single request across relationships, filtering/
    sorting/pagination built in, minimal payloads.
  - OFFLINE still requires **`lightning/uiGraphQLApi`** (v1). Do not "upgrade" offline samples.
  Inspected: JitendraZaa Mobile Offline guide Aug 2026; DianApps (mutation API).
- Mutation rules: `{ data, errors }` + `errors?.length` check; no child relationships in mutation
  selections; `refreshGraphQL()` after writes.
  Inspected: DianApps.
- **Offline-capable adapters:** `getRecords` (full), `graphql` via `uiGraphQLApi` (full),
  `getRecord` (limited — **field-list only, layout form unsupported offline**), related-list
  adapters (partial — **do not reflect offline-created/deleted records until sync**).
  Inspected: JitendraZaa (cites LWC wire-adapter reference + Apr-2025 offline dev blog).
- Guidance: GraphQL for complex/relational reads (1 round trip vs N chained wires); LDS
  `getRecord`/record APIs for known-ID reads and all CUD. Keep offline GraphQL queries under the
  ~32 KB guidance threshold (flagged by Mobile Extensions for VS Code, not a hard limit).
  Inspected: JitendraZaa.
- Custom wire adapters: **not supported on Salesforce Platform** (LWC OSS only); `@wire` is for
  reads — CUD stays imperative (Apex, LDS functions, or `executeMutation`).
  Inspected: lwc.dev Wire Adapters guide.

---

## 5. SSR / LWR / Experience Cloud

- **Experience Delivery (Beta) is DISCONTINUED** — Winter '27 / October 2026. Sites republish onto
  standard LWR infrastructure. Do NOT present Experience Delivery as available or coming.
  Snippet: LWR `lwr-ssr-hydration-experience-cloud` doc notice, Experience Delivery PDF (Jun 2026),
  help `rn_experiences_builder_sites` (Winter '27), maintask Winter '27 notes (4 consistent sources).
- **Islands SSR remains a standard LWR capability**, gated per page: theme layout must carry the
  `lightning__ServerRenderable` capability tag or the route is fully client-rendered.
  Snippet: LWR hydration-capabilities doc; GitHub myLearning correction note.
- SSR component constraints (LWC OSS + LWR): no web-platform APIs at render time on the server
  (guard `document`/`window`); `renderedCallback` never runs on the server; no error boundaries/
  `errorCallback` during SSR; wire adapters unsupported on the server; hydration supports **native
  shadow + light DOM only, NOT synthetic shadow**; use `hydrateComponent` (not `createElement`);
  server/client HTML mismatch logs an error and CSR VDOM wins.
  Inspected: lwc.dev SSR guide.
- LWR is the preferred framework for public/indexable Experience Cloud sites (SSR built in); Aura
  sites template is legacy for new builds.
  Inspected: Appsavio LWR-vs-Aura 2026 (secondary); consistent with LWR SSR docs.
- Validate SSR-ability with the SSR playground, SSR test runner, and Jest SSR-environment tests
  (`lwc-test` npm package runs tests in SSR and CSR modes).
  Snippet: LWR `lwr-ssr-components-test` doc.

---

## 6. Offline / mobile

Inspected body: JitendraZaa Complete Mobile Offline Guide (updated Aug 2026). Cross-checks: help
`salesforce_app_plus_offline`, `briefcase_builder_availability`, `salesforce_app_plus_offline_primed`
snippets.

- **Mobile App Plus** (add-on to Salesforce Mobile App, iOS/Android incl. tablets) = Mobile Offline
  + Mobile App Management (MAM) + custom branding (branding engine shared with Mobile Publisher,
  but Publisher ≠ App Plus: Publisher builds branded apps from Experience Cloud sites for
  external users; App Plus is for internal users).
- **Briefcase Builder:** defines primed record sets. Limits: **50,000 records per object (per user)**,
  5 active briefcases/org, 10 top-level object rules/briefcase, related objects up to 3 levels deep,
  ~1,000 page references (priming failures past this can be **silent** — always validate).
- **LWC Offline is pro-code + opt-in:** components must be **statically analyzable**; all data via
  offline-capable adapters (§4); no server logic offline (no Apex triggers, validation rules,
  flows); not all base components are offline-optimized. Local store = SmartStore (encrypted
  SQLite, 256-bit AES). Drafts queue locally, bidirectional sync + conflict resolution on reconnect.
- Field Service Mobile: related lists don't work offline for briefcase-primed records; time sheets
  and Inventory tab unavailable offline; picklist values not fetched during priming.
- 2026 deltas: Consumer Goods app offline support; Spring '26 Field Service native GIS offline
  layers; Summer '26 actionable push (GA), customizable mobile Home (Beta), Agentforce Voice in
  Mobile SDK; Mobile Extensions for VS Code at 0.5.0.
- **Mobile SDK 13.x** (early 2026): async/await REST, SFAP wrappers, SQLCipher Commercial.
  Snippet-only (copyprogramming roundup) — treat version as approximate.

---

## 7. Testing: Jest + UTAM

- **Jest is the unit-test standard** for LWC (`@salesforce/sfdx-lwc-jest`, v7.3.x current for
  Spring '26; v5.1.0+ dropped the API-version check so it tracks new API versions).
  Pattern: `createElement`, drive via `shadowRoot` queries, mock `@wire` adapters and Apex imports,
  assert rendering/events. Run via `sf force lightning lwc test run` or `sfdx-lwc-jest --watch`.
  Snippet: LWC Jest-run doc + sfdx-lwc-jest changelog notes; Inspected: dev.to testing playbook
  (Jest-for-LWC-unit-logic placement in pyramid), testmuai 2026 matrix (snippet).
- **UTAM (UI Test Automation Model)** is the recommended UI/E2E layer for Lightning: JSON page
  objects decouple tests from DOM/shadow-DOM churn; Salesforce ships base UTAM page objects for
  standard Lightning components. Use with Selenium/WebDriver, Provar, or Copado Robotic Testing.
  Reserve E2E for 10–20 high-value journeys; prefer metadata/`data-*`/`aria-*` locators over
  CSS/XPath.
  Inspected: dev.to/beefedai test-automation playbook (full UTAM/POM/CI treatment).
- **Agentforce for Developers** can generate LWC Jest cases (`einstein-lwctestcasegen`); DX MCP
  server (Beta) adds `create_lwc_jest_tests` and `guide_utam_generation` (latter non-GA).
  Snippet: Agentforce-for-Devs + MCP-testing docs.
- SSR Jest: `lwc-test` package runs suites in both SSR and CSR environments.
  Snippet: LWR SSR test doc.

---

## 8. VS Code tooling + TypeScript + Local Dev

- **Salesforce Extension Pack for VS Code** remains the required IDE path (LWC cannot be authored
  in Dev Console). LWC extension includes local-dev-server integration + TS preview flag.
- **TypeScript (Developer Preview, NOT GA):** install `typescript` + `@salesforce/lightning-types`
  (complete base-component definitions since Spring '26), set
  `"salesforcedx-vscode-lwc.preview.typeScriptSupport"/"salesforcedx-vscode-lwc.typescript": true`
  (key name varies by source — verify in your Extension Pack version), author `.ts` locally,
  **compile to `.js` and deploy only the JS** — the platform stores JavaScript only. DX MCP server
  can auto-convert existing JS LWCs to TS.
  Inspected: dev.to TypeScript-in-LWC (full setup + adoption advice); DianApps (4-step setup +
  typed sample); Snippet: LWC `ts.html` preview doc (TS 5.4.5 baseline from Winter '25).
- **Local Dev** (`sf plugins install @salesforce/plugin-lightning-dev`): live preview; since
  Winter '26 the single-component preview supports LDS wires, `@salesforce/*` modules, Apex.
  LWC Component Preview GA at v67.
  Snippet: Winter '26 dev guide; Summer '26 notes.
- **Lightning Out 2.0 (Winter '26 GA)** — the supported "LWC outside Salesforce" path:
  LWR-powered, iframe + shadow-DOM isolated, declarative `<lightning-out-application
  components="…" frontdoor-url="…">` tag, OAuth 2.0 via `/services/oauth2/singleaccess`
  (opaque tokens only — no JWT-bearer, no client-credentials flows), External Client App with
  `web` or `full` scope, CORS allowlist or UI Bridge API server flow, SLDS 1/2 styling-hook
  overrides. Authenticated users only (for now); guest access unsupported (unlike beta).
  Inspected: SalesforceBen Lightning Out 2.0 (full comparison table + auth flow); SalesforceCodex.
- **New Component Reference site** launched Nov 2025 (component reference + LWC object reference).
  Snippet-only (copyprogramming) — verify URL before linking in samples.

---

## 9. End-of-life / deprecations / mandatory migrations

| Item | Status | Action for samples |
|---|---|---|
| Aura framework | **NOT deprecated, no EOL date**; maintenance mode. Migrate new work to LWC | Never scaffold new Aura; show LWC-only patterns |
| Aura `ui:*` namespace | Deprecated, unsupported since May 2021 | Never reference |
| Lightning Locker (orig.) | Superseded by LWS; Trusted Mode is the escape hatch | Target LWS; document Trusted Mode only for vetted libs |
| Lightning Out (beta, Aura) | Replaced by Lightning Out 2.0 GA (Winter '26) | Demo 2.0 only; no Aura wrappers, no session-ID auth |
| Experience Delivery (Beta) | **Discontinued Winter '27 / Oct 2026** | Remove from all new content; use standard LWR islands SSR |
| Session IDs in outbound messages | **Removed Feb 16, 2026** | OAuth only |
| New Connected Apps | Creation disabled by default; **External Client Apps** are the path | ECA in all new integration samples |
| Triple DES SAML | **Retires Summer '26** | Migrate algorithms now |
| `WITH_SECURITY_ENFORCED` | Deprecated Summer '26 (v67) | Explicit user/system mode |
| Apex default modes (v67+) | User mode + `with sharing` defaults | Re-test every `@AuraEnabled` sample at v67 |
| `lightning/uiGraphQLApi` | Superseded by `lightning/graphql` for new ONLINE work; still REQUIRED offline | Split samples by context |
| `data:`-URI downloads | **Blocked by LWS at v67** | `blob:` + `URL.createObjectURL` |
| Synthetic shadow DOM | Unsupported for SSR hydration | Native shadow / light DOM for SSR-able components |
| `getRecord`-by-layout offline | Unsupported offline | Request explicit field lists |

Inspected: SalesforceBen (Out 2.0, Summer '26 Apex), DianApps (security migrations), JitendraZaa
(offline limits), lwc.dev (shadow/SSR). Snippet: Aura-EOL roundups (3 consistent: no EOL date),
help release notes (Experience Delivery, Out 2.0 auth/limitations).

---

## 10. What new samples MUST demo vs old patterns to AVOID

### Must demo (2025–2026 current)
1. `lwc:on` for dynamic event maps (replaces template if-chains + manual listener mgmt).
2. `executeMutation` CRUD via `lightning/graphql` with `{ data, errors }` + `errors?.length`
   checks and `refreshGraphQL()` after writes; reads via `@wire(graphql)`.
3. Complex template expressions (Beta-flagged): ternaries, `?.`, `??`, array methods in markup.
4. TypeScript-authored LWC (`.ts` + compile-to-JS workflow, `@salesforce/lightning-types` casts
   for `event.target`) — labeled Developer Preview.
5. LWC State Management for cross-component shared state (Summer '26 GA).
6. `lightning-empty-state` / `lightning-illustration` for empty states (no custom CSS).
7. `blob:`-based file downloads (`URL.createObjectURL` + MIME), LWS-clean at v67.
8. LWS ESLint rules passing; Trusted Mode only in a dedicated, clearly-warned third-party-lib sample.
9. Nav-to-flow via `standard__flow` + `flow__`-prefixed state; LWC local flow actions
   (`lightning__FlowAction`) for client-side flow logic.
10. SSR-safe components: light/native shadow, guarded browser APIs, `hydrateComponent`, SSR+CSR Jest.
11. Offline sample track: statically analyzable LWC + `uiGraphQLApi` + explicit-field `getRecord` +
    Briefcase Builder config + sync/conflict handling.
12. Lightning Out 2.0 embed (OAuth single-access + `<lightning-out-application>`), ECA-based.
13. Jest unit tests per sample (`sfdx-lwc-jest` v7) + UTAM page objects for the E2E track.
14. v67-safe Apex (`with sharing`, user mode, no `WITH_SECURITY_ENFORCED`, no session IDs).

### Must avoid (outdated / broken / retired)
- Aura wrappers for LWC (incl. Lightning Out beta), new Aura components, any `ui:*` refs.
- `data:`-URI downloads or `data:` URLs passed through events/links.
- `getRecord`-by-layout in offline contexts; `lightning/graphql` v2 in offline samples.
- Synthetic-shadow-only components presented as SSR-compatible.
- Experience Delivery setup guides (discontinued Oct 2026).
- Session-ID auth (Lightning Out beta style, outbound messages), JWT-bearer/client-credentials
  for Lightning Out 2.0, Triple DES SAML.
- Getter boilerplate where complex expressions apply; manual add/removeEventListener where
  `lwc:on` applies (keep one legacy sample only if explicitly contrasting).
- Shipping `.ts` to an org; custom hand-rolled base-component type stubs (use
  `@salesforce/lightning-types`).
- DOM-scraping E2E without UTAM/page objects; CSS/XPath-first locator strategies.
- `WITH_SECURITY_ENFORCED`, implicit-`without-sharing` Apex, system-mode assumptions at v67+.

---

## 11. Sources

### Fully inspected bodies
- https://lwc.dev/guide/wire_adapter (wire rules, OSS-only custom adapters, reads-vs-CUD)
- https://lwc.dev/guide/ssr (SSR constraints, hydration, shadow-DOM support)
- https://dianapps.com/blog/salesforce-spring-26-release-developers-guide/ (Spring '26 LWC:
  `lwc:on`, mutations, TS, nav-to-flow, Error Console, complex expressions, empty-state, security)
- https://s2-labs.com/blog/salesforce-spring-26-features/ (Spring '26 GraphQL/TS/expressions,
  Agentforce discoverability)
- https://dev.to/dipojjal/typescript-in-lwc-what-spring-26-actually-changes-1cjf (TS setup,
  compile-to-JS, preview status)
- https://www.salesforceben.com/salesforce-to-finally-launch-lightning-out-2-0-in-winter-26-after-a-decade-in-beta/
  (Out 2.0 vs beta table, OAuth single-access, ECA scopes, declarative tag)
- https://salesforcecodex.com/salesforce/explore-the-top-salesforce-winter-26-features-for-developers/
  (Winter '26: Trusted Mode, Out 2.0)
- https://www.salesforceben.com/top-8-salesforce-summer-26-features-for-developers/ (Summer '26:
  state mgmt GA, Release Manager, Apex secure defaults)
- https://www.jitendrazaa.com/blog/salesforce/salesforce-mobile-offline-complete-guide-2026-briefcase-2/
  (offline: adapters, Briefcase limits, priming/sync, Mobile App Plus, 2026 deltas)
- https://dev.to/beefedai/selecting-test-automation-tools-for-salesforce-4n31 (Jest vs UTAM vs
  commercial tools, page-object/CI playbook)

### Official pages corroborated via snippets only (direct fetch 403)
- https://developer.salesforce.com/blogs/2025/09/winter26-developers (Winter '26: graphql module,
  local actions, Trusted Mode, Local Dev preview)
- https://developer.salesforce.com/blogs/2026/01/developers-guide-to-the-spring-26-release
  (Spring '26 LWC updates incl. TS enablement)
- https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release
  (Summer '26: API 67 grouped details/HMR, `data:`-URI block, LWS distortions)
- https://developer.salesforce.com/blogs/2025/10/lightning-out-2-0-is-now-generally-available-in-winter-26
- https://developer.salesforce.com/docs/platform/lwc/guide/security-lwsec-enable.html and
  `.../lightning-components-security/guide/lws-build-components.html`, `lws-test-workflow.html`
- https://developer.salesforce.com/docs/platform/lwc/guide/ts.html (TS preview, 5.4.5 baseline)
- https://developer.salesforce.com/docs/platform/lwc/guide/unit-testing-using-jest-run-tests.html
- https://developer.salesforce.com/docs/platform/lwc/guide/mcp-testing.html (Beta Jest/UTAM MCP tools)
- https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-lwctestcasegen.html
- https://developer.salesforce.com/docs/platform/lwr/guide/lwr-ssr-hydration-experience-cloud.html
  + `lwr-ssr-components-test.html` (discontinuation notice, ServerRenderable gate, SSR test runner)
- https://help.salesforce.com/s/articleView?id=release-notes.rn_experiences_builder_sites.htm (Winter '27
  Experience Delivery discontinuation) and rn_lwc_* / rn_apex_* Summer '26 notes (via SalesforceBen links)
- https://help.salesforce.com/s/articleView?id=xcloud.salesforce_app_plus_offline.htm,
  `sf.briefcase_builder_availability`, `sf.salesforce_app_plus_offline_primed` (offline/briefcase facts)
- https://trailhead.salesforce.com/content/learn/modules/lightning-web-security-basics/... (LWS model;
  direct fetch 404 — module path may have moved)
- https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/experience_delivery.pdf (Jun 2026,
  discontinuation notice)

### Unresolved / needs direct verification on developer.salesforce.com
- Exact `lwc:on` GA constraints at v66 (supported targets, SSR interplay) — only secondary samples seen.
- Winter '26 `lightning/graphql` "optional fields" semantics — snippet-only.
- Local Dev single-component preview limits and LWC Component Preview GA scope at v67 — snippet-only.
- New Component Reference site URL (Nov 2025 launch) — single snippet source.
- Mobile SDK 13.x feature list — single snippet source.
- `sfdx-lwc-jest` exact latest version (7.3.x seen) — changelog not directly inspected.
- LWS v67 full distortion list beyond `data:`/innerHTML/MutationObserver — snippet-only.
