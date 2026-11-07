# 07 Dynamic Event Playground (`eventPlayground`)
Scenario: B3 follow-up. A coordinator toggles edit/preview modes on an intake list.
Setup: deploy bundle; optionally pass `recordIds` for live `getRecords` rows, else sample rows render.
Learning goals: `lwc:on` event-map switching (replaces if:true handler chains), `getRecords`, single-template dual-mode UI.
Acceptance: mode toggle rewires handlers with no template duplication; Jest asserts both handler maps fire.
