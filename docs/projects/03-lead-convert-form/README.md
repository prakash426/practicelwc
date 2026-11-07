# 03 Lead Convert Form (`leadConvertForm`)
Scenario: B1. One-click lead conversion with account/contact preview and navigation to the new Account.
Setup: deploy bundle + `LeadConvertService.cls`; place on a Lead record page.
Learning goals: imperative Apex, `Database.convertLead`, NavigationMixin `Navigate`, error handling via `c-error-panel`.
Acceptance: converts lead, navigates to Account, toasts; Apex test covers already-converted dupe path.
