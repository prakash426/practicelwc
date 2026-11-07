# 06 Project Intake Wizard (`projectIntakeWizard`)
Scenario: B3. Replace email+spreadsheet intake with a guided 3-step wizard creating `Project__c`.
Setup: deploy bundle + `Project__c` object metadata; add to Home or an App page.
Learning goals: `lightning-progress-indicator`, conditional steps, per-step `reportValidity`, `createRecord`, post-create file upload.
Acceptance: cannot advance with invalid step; record created; Jest walks all steps incl. back-navigation.
