# 15. Agent Console Workspace

Business scenario I2: a 360-degree console with header, SLA countdown, timeline, and macros. Siblings sync over the `Agent_Message__c` Lightning Message Channel (`case-selected`, `macro-done`); the timeline refreshes via `refreshApex` after each macro; macros run imperative Apex and log Tasks.

- Bundles: `agentConsoleWorkspace` (record-view-form header, LMS publish, `macroexecuted` listener), `slaHeader` (LMS subscriber, countdown), `caseTimeline` (LMS subscriber, wired tasks, refreshApex), `macroBar` (imperative Apex, custom event, toasts)
- Message channel: `Agent_Message__c`
- Apex: `MacroService` (cacheable task list, macro runner with close/escalate side effects) + test (5 tests)
- Concepts: Lightning Message Service, console sibling sync, imperative Apex, custom events, refreshApex
- Branch: `project/15-agent-console-workspace`
