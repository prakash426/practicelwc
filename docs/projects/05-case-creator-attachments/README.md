# 05 Case Creator with Attachments (`caseCreator`)
Scenario: B2 escalation. Create a Case prefilled from the finder search term, with file upload.
Setup: deploy bundle + `SearchTerm` channel; place next to Project 4 on an App or Experience page.
Learning goals: LMS subscribe/unsubscribe lifecycle, `createRecord`, `lightning-file-upload`, `lightning-record-form` confirm view, nav-to-record.
Acceptance: term prefilled from LMS; Case saved with attachments; Jest mocks LDS createRecord.
