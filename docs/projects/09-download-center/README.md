# 09 Download Center (`downloadCenter`)
Scenario: B3. A coordinator exports the intake list as CSV.
Setup: deploy bundle + `ProjectController.cls` + `Project__c` object; add to Home or an App page.
Learning goals: `Blob` + `URL.createObjectURL` download (never `data:`, which LWS blocks at v67), cacheable Apex, datatable + empty state.
Acceptance: CSV downloads with `text/csv` MIME; LWS lint clean; Jest asserts the `createObjectURL` path.
