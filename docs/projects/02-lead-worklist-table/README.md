# 02 Lead Worklist Table (`leadWorklistTable`)
Scenario: B1. An SDR triages new web leads in a sortable table with row actions.
Setup: deploy bundle + `LeadController.cls`; assign object access; add to Home or an App page.
Learning goals: `@wire` Apex, `lightning-datatable` row actions, `refreshApex`, `ShowToastEvent`, `createRecord` Task, `lightning-empty-state` wrapper.
Acceptance: New Task row action creates Task + toast; empty queue shows empty state; Jest mocks the wire.
