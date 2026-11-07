# 11. Approval Inbox

Business scenario I1: a sales manager triages discount requests. Datatable inbox with inline comment editing, row-action approve/reject modal with comments, `refreshApex` after every write, and `empApi` platform-event subscription for live arrivals.

- Bundles: `approvalInbox` (datatable inline edit, refreshApex, empApi, empty state, error alert), `approvalActionModal` (custom `close`/`decided` events)
- Object: `Approval_Request__c` + 4 fields
- Apex: `ApprovalService` (cacheable list, inline save, decide with validation), `ApprovalServiceTest` (4 tests)
- Jest: rows render, empty state, wire error
- Concepts: lightning-datatable inline edit, modals, custom events, caching + refreshApex, platform events
- Branch: `project/11-approval-inbox`
