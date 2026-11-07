# Real-World Salesforce Business Scenarios for LWC

Research date: 2026-11-07
Sources: Trailhead business-scenario framework, Superbadges, AppExchange/partner case studies, customer testimonials, LWC scenario guides.

Trailhead defines the level model used below: **Beginner** = typically out-of-box capabilities, quick time to value; **Intermediate** = requires integration and custom work; **Advanced** = complex use cases (see Trailhead "Salesforce Business Scenarios" quick-look module). Architect-level scenarios below extend that model to multi-cloud / multi-org / regulated-scale designs.

---

## Level 1 — Beginner

### B1. Web-to-Lead Capture + Lead Worklist
- **Persona:** SDR / inside sales rep at an SMB (e.g. home-improvement seller hitting a lead plateau).
- **Pain:** Leads captured in spreadsheets and web forms with no dedupe, no routing, no follow-up tracking; manual copy between marketing and sales. Sphere Inc. case study client saw stagnant lead generation until Sales Cloud migration, then +50% leads.
- **Objects involved:** Lead, Campaign, CampaignMember, Task, Account/Contact (on conversion).
- **Flow:** Web-to-Lead form -> assignment rule -> LWC lead worklist -> convert.
- **LWC features exercised:** `lightning-record-form` / `lightning-record-edit-form`, `lightning-datatable` with row actions, Lightning Data Service (`getRecord`, `updateRecord`), toast events, list-view search/filter.
- **Trailhead parallel:** Admin Beginner (objects, security, Flow), "Build a Data Model" patterns.

### B2. Knowledge-Centered Case Self-Help Finder
- **Persona:** Customer + support agent.
- **Pain:** Customers file tickets for answered questions; agents search siloed spreadsheets and legacy DBs. Service Cloud write-ups cite overloaded agents and fragmented history as the top pain.
- **Objects involved:** Case, Knowledge__kav (Lightning Knowledge), Contact, Account.
- **Flow:** Customer types question -> suggested articles -> escalate to Case only if unresolved.
- **LWC features exercised:** Wire Apex search (`@wire` + imperative refresh), `lightning-accordion` article viewer, `lightning-file-upload` for case attachments, record creation via LDS, LMS publisher (search term shared with a "create case" sibling component).
- **Interview-scenario parallel:** LearnFrenzy LWC Scenario 2 (file upload + file display component interaction).

### B3. Donation / Fit-Out Project Intake Form
- **Persona:** Operations coordinator (real-estate / nonprofit style intake).
- **Pain:** Intake via email + spreadsheets; no consolidated view. PASHA Property Management ran 1,000+ CAPEX/fit-out projects across 30+ properties this way before moving to one Salesforce backbone.
- **Objects involved:** Custom `Project__c`, Contact, ContentDocument (attachments).
- **Flow:** Screen-flow-style LWC wizard -> validation -> record create -> confirmation.
- **LWC features exercised:** Multi-step wizard (conditional rendering, progress indicator), custom validation, `createRecord`, `lightning-file-upload`, navigation mixin (`Navigate` to new record).

---

## Level 2 — Intermediate

### I1. Discount / Spend Approval Workflow
- **Persona:** Sales rep + sales manager + finance approver.
- **Pain:** Discounts approved over email; no audit trail; margin leakage. CPQ case studies (Achieva/Japanese manufacturer, CloudCache oil & gas) repeatedly cite inconsistent discounting and missing approval workflows as the trigger.
- **Objects involved:** Opportunity, OpportunityLineItem / Quote, Pricebook2, custom `Approval_Request__c` or standard Approval Process + `ProcessInstance`.
- **Flow:** Rep requests discount in LWC -> Flow/approval process routes -> manager approves/rejects in LWC inbox -> opportunity updated.
- **LWC features exercised:** Imperative Apex (discount eligibility check: account history + deal size + approval rules), `lightning-datatable` approval inbox, platform events / `empApi` refresh on approval, `ShowToastEvent`, modal (`lightning-modal`) for approve/reject comments.
- **Real LWC pattern:** "Check Discount Eligibility" button -> Apex -> instant LWC message (NareshIT LWC+Apex example).

### I2. Service Console Agent Workspace (360-Degree View)
- **Persona:** Contact-center agent handling chat/email/phone/portal cases.
- **Pain:** No unified case history; tab-switching across systems; repetitive clicks. Standard Service Cloud pain table: "reps lack a comprehensive understanding of a user and must rely on several resources," causing long waits and low CSAT.
- **Objects involved:** Case, Contact, Account, Asset, Entitlement, Knowledge, Task/Activity, ChatTranscript.
- **Flow:** Omnichannel routes Case -> console tab opens -> 360 header + timeline + knowledge + macros.
- **LWC features exercised:** Lightning Message Service (console tab components talk to each other), `lightning-record-view-form` header widgets (SLA countdown, health score), custom timeline component, quick-action macros wired to Apex, utility-bar component, console navigation APIs (`openTab`, `focusTab`).
- **Interview-scenario parallel:** LearnFrenzy LWC Scenario 1 (LMS sender/receiver) + Scenario 5 (custom notifications).

### I3. Customer / Partner Community Portal (Experience Cloud)
- **Persona:** Partner sales rep / customer self-service user (e.g. Xsight Labs partner portal; AES financial client portal; Prosci web-store-to-portal integration).
- **Pain:** Partners email proposals and progress reports; customers wait days for access provisioning; no shared file/case visibility.
- **Objects involved:** Account, Contact, Case, Opportunity (deal registration), ContentDocument, custom `Project_Proposal__c` / `Project_Report__c`.
- **Flow:** Portal login -> dashboard (my cases, proposals, files) -> submit proposal -> track approvals -> download docs.
- **LWC features exercised:** Experience Cloud–compatible LWC (exposed via Experience Builder), guest/secure sharing (`with sharing`, sharing sets), `lightning-breadcrumb` navigation, file list + preview, record-triggered Flow invocation from LWC button, custom login/registration styling.
- **Evidence:** Nubessom (Xsight Labs: Experience + Service Cloud support process, partner portal, Jira integration); iMinds partner portal (proposals + progress + actuals via Community).

---

## Level 3 — Advanced

### A1. CPQ Lite — Guided Quoting with Product & Pricing Rules
- **Persona:** AE / quoting specialist (manufacturing, HVAC, oil & gas).
- **Pain:** Excel quoting with errors, wrong price books, unapproved discounts, slow quote-to-order cycle. Girikon case: CPQ had to replicate and then standardize an Excel sheet; eConnectT case: branch-based defaulting of price book, currency, language, templates was missing.
- **Objects involved:** Opportunity, Quote, QuoteLineItem, Product2, Pricebook2/PricebookEntry, custom `Pricing_Rule__c` / `Product_Rule__c`, Approval (Advanced Approvals).
- **Flow:** Guided selling wizard -> bundle configuration -> pricing rules -> discount approval -> branded quote PDF -> order.
- **LWC features exercised:** Complex stateful wizard (parent orchestrator + child line-item editors via LMS/events), imperative Apex pricing engine calls, `lightning-tree-grid` for bundles, PDF generation trigger (Flow + template), Advanced Approval integration, price-book/currency dynamic picklists.
- **Evidence:** Rithom commercial-HVAC (custom asset-based preventative-maintenance quoting); Achieva (2,000+ products, 50+ product rules, 25+ pricing rules, guided selling); AppExchange CPQ use-case table (quote generation + approval + analytics dashboards).

### A2. Field Service — Work Orders, Scheduling & Mobile
- **Persona:** Dispatcher + mobile field technician + customer awaiting service.
- **Pain:** Separate CRM and field systems; QuickBooks as finance silo; repeat visits and travel waste. HVAC transformation: 20-30% productivity gain, 5-20% fewer repeat visits, 5-30% less travel after unification.
- **Objects involved:** WorkOrder, WorkOrderLineItem, ServiceAppointment, ServiceResource, ServiceTerritory, Asset, OperatingHours, Case, Account.
- **Flow:** Case -> Work Order -> schedule Service Appointment -> technician mobile app -> complete + report -> customer notification.
- **LWC features exercised:** Offline-capable mobile LWC patterns, `lightning-map` for route/day view, signature + photo capture (`lightning-input type=file`, device camera), barcode/asset scan, imperative Apex for availability/scheduling, push notifications, background sync handling.
- **Evidence:** Rithom HVAC (custom mobile app for techs); CRMIT global-manufacturing FSL + Service + Community solution; QA guide to FSL (Cases/Accounts/Contacts + work orders + appointments + inventory in one lifecycle).

### A3. Real-Time Operational Analytics Dashboard
- **Persona:** Capacity planner / ops analyst (Azercosmos-style satellite ops; retail ops).
- **Pain:** Legacy report takes 10-15 minutes per run, single-threaded, no customization. Azercosmos rebuild: 120x faster (5 seconds), dynamic sizing, textured graphs, schedulable PDF email delivery.
- **Objects involved:** Custom telemetry/capacity objects (e.g. `Transponder_Group__c`), Case/Asset aggregates, Report/Dashboard subscriptions, ContentDocument (PDF output).
- **Flow:** Live data -> LWC charting engine -> drill-down -> scheduled PDF snapshot by email.
- **LWC features exercised:** Third-party charting in LWC (D3/Chart.js via static resources, `lwc:dom="manual"`), high-volume wire optimization (cacheable Apex, pagination, lazy load), dynamic Apex grouping/sorting, schedulable Apex + email with PDF attachment, custom textured/proportional visuals.
- **Evidence:** Nubessom Azercosmos story (Apex + LWC chart-engine rewrite); retail LWC dashboard pattern (order tracking, real-time insights, sales analytics).

---

## Level 4 — Architect

### R1. Multi-Brand Identity, Consent & Portal at Scale (3M+ Identities)
- **Persona:** Platform architect + privacy officer + B2B app teams (E.ON: 33M customers, 30+ countries).
- **Pain:** Fragmented identity across B2B apps; no data segregation between brands; consent model failing GDPR; no adoption telemetry.
- **Objects involved:** Account, Contact, User, custom `Consent__c` / `Identity_Event__c`, Experience Cloud sites, Shield event logs.
- **Flow:** Unified auth layer -> lifecycle provisioning/revocation -> consent capture -> per-brand data segregation -> threat detection -> adoption dashboards.
- **LWC features exercised:** Secure Experience Cloud LWC (Locker/LWS, CSP-safe API calls), MuleSoft/Twilio-backed custom APIs surfaced through LWC admin consoles, Transaction Security policy UX, Shield event-log viewers, consent-management components with granular toggles.
- **Evidence:** Nubessom E.ON story (Identity + Experience Cloud + Shield + MuleSoft + Twilio; 3M+ identities; GDPR-compliant consent; Identity API).

### R2. EX-Rated Offline Field Workbench with External Telemetry (Oil & Gas)
- **Persona:** Field technician in hazardous/explosive (EX-rated) zones + reliability engineer.
- **Pain:** Paper/legacy checks on critical equipment; missed early-failure signals; no link between field readings and trending systems.
- **Objects involved:** Service Cloud Cases, FSL WorkOrder/ServiceAppointment/Asset, custom `Equipment_Check__c` / `Parameter_Reading__c`, external PI Vision historian (integration).
- **Flow:** Schedule equipment checks -> EX-rated mobile app records parameters offline -> sync -> flag early failure -> PI Vision trending -> trigger follow-up work.
- **LWC features exercised:** Offline-first LWC/mobile architecture, large-custom-API integration layer, background sync + conflict resolution UX, threshold/alerting components, embedded external telemetry views, managed-package upgrade-safe extension points.
- **Evidence:** Nubessom oil & gas Operator Work Bench programme (Service Cloud + FSL in single EX-rated mobile app; PI Vision integration).

### R3. Omnichannel Support Hub + Lead/Portfolio Routing + Deal Intelligence
- **Persona:** Enterprise architect spanning Sales + Service + Community + Data (utilities/telecom scale).
- **Pain:** Misrouted leads, no referral crediting, flooded agent inboxes, blind community behavior, margin risk invisible at approval time.
- **Objects involved:** Lead, Account, Opportunity, Case, Experience Cloud activity (`Community_Activity__c` style custom object), DealHub/DealRoom custom objects, Einstein Bot transcripts.
- **Flow:** Einstein Bot triage -> Flow-based lead/portfolio routing + referral crediting -> redesigned case assignment -> dynamic record-sharing support hub -> DealRoom margin-risk view at approval.
- **LWC features exercised:** Complex Community LWCs with dynamic record sharing, user-behavior analytics instrumentation on portal pages, Einstein Bot handoff components, LMS across bot/console/portal, CRM Analytics (Einstein deal-intelligence) embeds, high-scale Flow + Apex routing invoked from LWC admin tooling.
- **Evidence:** Nubessom managed-services delivery (lead/portfolio routing Flows, Einstein Bots fronting Support Chat, complex Community LWCs, portal behavior analytics, dynamic-sharing support hub, DealHub/DealRoom); H&H Soft Cloud (CPQ + MuleSoft ERP + Experience partner portals + Einstein deal intelligence for margin risk).

---

## Scenario x Level Matrix

| Scenario | Level | Core clouds |
|---|---|---|
| Web-to-Lead + worklist | Beginner | Sales Cloud |
| Knowledge self-help finder | Beginner | Service Cloud / Knowledge |
| Project intake wizard | Beginner | Platform / Flow |
| Discount approval inbox | Intermediate | Sales Cloud / Approvals |
| Agent console workspace | Intermediate | Service Cloud / Omni |
| Partner/customer portal | Intermediate | Experience Cloud |
| CPQ Lite guided quoting | Advanced | Revenue Cloud (CPQ) |
| Field Service + mobile | Advanced | Field Service / Service |
| Realtime ops dashboard | Advanced | Platform / Analytics |
| Multi-brand identity + consent | Architect | Identity / Shield / XP |
| EX-rated offline workbench | Architect | FSL / MuleSoft / IoT |
| Omnichannel hub + routing | Architect | Sales + Service + XP + Einstein |

## Sources Inspected

1. Trailhead — Salesforce Business Scenarios quick-look (beginner/intermediate/advanced definitions): https://trailhead.salesforce.com/content/learn/modules/salesforce-business-scenarios-quick-look/deliver-your-business-objectives
2. Trailhead Superbadges catalog and business-case framing (Formulas/RAS retailer, Apex Agentforce/Coral Cloud, MFA-SSO/Cumulus bank): https://trailhead.salesforce.com/content/learn/superbadges/superbadge_formulas_sbu/superbadge-formulas-get-ready
3. LearnFrenzy — Real Scenario-Based Questions on LWC Part 2 (LMS sender/receiver, file upload + display): https://learnfrenzy.com/blog/real-scenariobased-questions-on-lightning-web-components-lwc--part-2
4. LearnFrenzy — LWC Part 3 (real-time updates, custom notifications): https://learnfrenzy.com/blogs/real-scenariobased-questions-on-lightning-web-components-lwc--part-3
5. LWC use-case guide — business-scenario + integration patterns (record header widgets, embedded ERP/e-commerce views): https://copyprogramming.com/howto/lightning-web-component-use-cases
6. TechPratham LWC training — Amazon support console + Apple retail booking scenarios: https://www.techpratham.com/courses/salesforce-lightning-web-components-training
7. Sphere Inc. — home-improvement Sales Cloud (+50% leads, +20% sales; pricebook integration): https://www.sphereinc.com/case-studies/salesforce-sales-cloud-solution-boosts-sales
8. LocalBizNetwork/Girikon — Service Cloud pain-point table (siloed history, macros, self-service portals): https://www.localbiznetwork.com/articles/enhancing-customer-experience-with-salesforce-service-cloud
9. Nubessom customer success — E.ON identity (3M+), Azercosmos capacity planning (120x), PASHA approvals (15d->3d), oil & gas OWB, lead/portfolio routing + DealRoom: https://www.nubessom.com/customer-success/
10. Rithom — commercial HVAC CPQ + Field Service (custom quoting, tech mobile app, productivity/repeat-visit/travel gains): https://rithom.com/our-work/commercial-hvac-salesforce-cpq-field-service/
11. CRMIT — global manufacturing FSL + Service + Community: https://www.crmit.com/customers/salesforce-field-service-cloud-implementation.html
12. KSolve — FSL testing guide (work orders, appointments, scheduling, mobile, inventory lifecycle): https://www.ksolves.com/blog/salesforce/qa-guide-to-testing-salesforce-field-service-cloud
13. Achieva — Japanese manufacturer Sales Cloud + CPQ (2,000+ products, 50+ product rules, guided selling): https://achieva.ai/success-story/salesforce-sales-cloud-and-cpq-implementation-for-manufacturer/
14. Girikon — CPQ Excel-standardization case: https://www.girikon.com/blog/casesstudy/cpq-implementation/
15. H&H Soft Cloud — CPQ + MuleSoft ERP + Experience portals + Einstein deal intelligence: https://www.hhsoftcloud.com/case-studies.html
16. NareshIT — LWC+Apex discount-eligibility pattern: https://nareshit.com/blogs/calling-apex-methods-from-salesforce-lwc-explained
