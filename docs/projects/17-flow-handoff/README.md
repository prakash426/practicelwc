# 17. Flow Handoff: Quote-to-Approval Flow

Business scenario I1: a rep edits quote fields on the record, previews client-side discount math, and jumps into a screen flow with context via the nav-to-flow one-liner (`standard__flow` + `flow__`-prefixed state). A companion LWC local flow action computes discount totals inside the flow with no server round trip.

- Bundles: `flowHandoff` (record-edit-form, getRecord preview, nav-to-flow, Builder design props), `discountFlowAction` (lightning__FlowAction local action, input/output contract)
- Apex: `QuoteApprovalService.createApprovalRequest` (creates the Pending request the flow approves) + test (3 tests)
- Jest: action contract (valid math, 0-100 clamp, non-numeric guard)
- Concepts: nav-to-flow, LWC local flow actions, record-edit-form, design attributes
- Branch: `project/17-flow-handoff`
- Depends on: project 11 `Approval_Request__c` object
