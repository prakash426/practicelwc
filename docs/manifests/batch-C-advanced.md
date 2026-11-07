# Batch C: Advanced Projects 19-27

Source: `/tmp/lwc-curriculum/curriculum.md` (Level 3), API v67, `with sharing` + user mode Apex.

| # | Project | Bundle(s) | Apex | Jest |
|---|---------|-----------|------|------|
| 19 | CPQ Lite Wizard | `cpqLiteWizard`, `cpqLineEditor` (slots, tree-grid, picklists, state via events) | `PricingEngine` + test (rule matrix) | ✅ cpqLiteWizard.test.js |
| 20 | Quote PDF Delivery | `quotePdfDelivery` (record-view-form, blob preview, nav-to-flow) | `QuotePdfService` (schedulable+invocable) + test | — |
| 21 | Field Day Planner | `fieldDayPlanner` (lightning-map, empApi live, refreshApex) | `SchedulingService` + test | — |
| 22 | Offline Technician App | `offlineTechApp` (explicit-field getRecord, localStorage drafts, conflict UX, camera input) | none offline (queued sync) | ✅ offlineTechApp.test.js |
| 23 | Realtime Ops Dashboard | `opsDashboard` (lwc:dom=manual, lazy chart, empApi, dynamic grouping) | `OpsTelemetryService` + test | — (transform layer is `aggregate()`) |
| 24 | Typed Data Grid (TS Preview) | `typedDataGrid` (`typedDataGrid.ts` source + compiled `.js`; deploy JS only) | `TypedGridService` + test | — |
| 25 | SSR Product Catalog | `ssrProductCatalog` (light DOM, SSR-safe, no window/document) | `CatalogService` + test | — |
| 26 | UTAM E2E Track | `utam/quoteWizard.utam.json`, `approvalInbox.utam.json`, `quoteToCash.test.js`, `wdio.conf.js` | reuses 19-20 metadata | — (UTAM journey) |
| 27 | Secure File Hub | `secureFileHub` (file-upload, blob download, textContent-only, no innerHTML/data:/MutationObserver) | `FileHubService` + test | ✅ secureFileHub.test.js |

Advanced patterns covered: LDS + UI Record API (19,20,22), platform events/empApi (21,23), file upload (22,27), dynamic components/slots (19), performance lazy/pagination (23), security LWS/CSP/sharing (all Apex `with sharing` + `WITH USER_MODE`, no `WITH_SECURITY_ENFORCED`; 27 hardening; 23 Trusted-Mode warning), offline drafts (22), mobile-ready (22 compact + file input).

Branches: `project/19-cpq-lite-wizard` … `project/27-secure-file-hub` (cut from `level/3-advanced`).
