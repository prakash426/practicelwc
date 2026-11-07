# Batch B Manifest: Intermediate Projects 10-18

Source: `/tmp/lwc-curriculum/curriculum.md` Level 2. All output under `/tmp/lwc-batch-B/` only; workspace checkout untouched.

| # | Project | Folder | LWC bundles | Apex + test | Jest |
|---|---------|--------|-------------|-------------|------|
| 10 | Discount Eligibility Checker | `10-discount-checker` | discountChecker | DiscountService / DiscountServiceTest (5) | discountChecker.test.js (3) |
| 11 | Approval Inbox | `11-approval-inbox` | approvalInbox, approvalActionModal | ApprovalService / ApprovalServiceTest (4) | approvalInbox.test.js (3) |
| 12 | GraphQL Opportunity Explorer | `12-graphql-opportunity-explorer` | graphqlOppExplorer | OppExplorerService fallback / Test (2) | graphqlOppExplorer.test.js (2) |
| 13 | GraphQL Mutations Editor | `13-graphql-mutations-editor` | graphqlOppEditor | OppEditorFallback / Test (2) | graphqlOppEditor.test.js (3) |
| 14 | Shared Cart State | `14-shared-cart-state` | stateStore, cartList, cartSummary, cartApp | CartService / CartServiceTest (2) | cartList.test.js (3) |
| 15 | Agent Console Workspace | `15-agent-console-workspace` | agentConsoleWorkspace, slaHeader, caseTimeline, macroBar | MacroService / MacroServiceTest (5) | - (Apex-covered) |
| 16 | Partner Portal Dashboard | `16-partner-portal-dashboard` | partnerPortalDashboard | PortalService / PortalServiceTest (3) | partnerPortalDashboard.test.js (2) |
| 17 | Flow Handoff | `17-flow-handoff` | flowHandoff, discountFlowAction | QuoteApprovalService / Test (3) | discountFlowAction.test.js (3) |
| 18 | Notification Center | `18-notification-center` | notificationCenter | NotificationService / Test (2) | notificationCenter.test.js (3) |

Required-concept coverage:

- record forms: 10 (record-view-form), 15 (record-view-form), 16 (record-view-form), 17 (record-edit-form)
- datatable with inline edit: 11 (comments), 13 (name/amount), 14 (qty)
- pubsub / lightning-message-service: 15 (Agent_Message__c channel, publish/subscribe)
- custom events: 10 (eligibilitychecked), 11 (close/decided), 14 (cartupdate), 15 (macroexecuted)
- imperative Apex: 10, 11, 15, 16 (files), 18 (send)
- caching: 11/14/15/16 (cacheable Apex), 12/13 (refreshGraphQL), 11/15/16 (refreshApex)
- error handling: every bundle (alerts, toasts, retry, errors-array checks)
- Jest for at least 3: shipped for 8 of 9 (10, 11, 12, 13, 14, 16, 17, 18)

Branches: `project/10-discount-checker` through `project/18-notification-center` per curriculum.
Shared notes: API 67.0, `with sharing` + user-mode Apex, no `WITH_SECURITY_ENFORCED`, no `data:` URIs. Project 17 reuses project 11 `Approval_Request__c`.
