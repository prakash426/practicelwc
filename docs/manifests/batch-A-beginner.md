# Batch A Manifest: Beginner Projects 1-9

Curriculum: /tmp/lwc-curriculum/curriculum.md (Level 1). API 67.0, user mode + with sharing Apex.

## Projects
1. helloLeadCard (01-hello-lead-card)
2. leadWorklistTable (02-lead-worklist-table) + LeadController
3. leadConvertForm (03-lead-convert-form) + LeadConvertService
4. knowledgeFinder (04-knowledge-finder) + KnowledgeSearchController + SearchTerm channel
5. caseCreator (05-case-creator-attachments)
6. projectIntakeWizard (06-project-intake-wizard)
7. eventPlayground (07-dynamic-event-playground)
8. recordHeaderWidgets (08-record-header-widgets)
9. downloadCenter (09-download-center) + ProjectController

Shared: utilsLib, errorPanel, emptyStateWrap, Project__c object (Status__c, Budget__c).

## Files
./docs/projects/01-hello-lead-card/README.md
./docs/projects/02-lead-worklist-table/README.md
./docs/projects/03-lead-convert-form/README.md
./docs/projects/04-knowledge-finder/README.md
./docs/projects/05-case-creator-attachments/README.md
./docs/projects/06-project-intake-wizard/README.md
./docs/projects/07-dynamic-event-playground/README.md
./docs/projects/08-record-header-widgets/README.md
./docs/projects/09-download-center/README.md
./force-app/main/default/classes/KnowledgeSearchController.cls
./force-app/main/default/classes/KnowledgeSearchController.cls-meta.xml
./force-app/main/default/classes/KnowledgeSearchControllerTest.cls
./force-app/main/default/classes/KnowledgeSearchControllerTest.cls-meta.xml
./force-app/main/default/classes/LeadController.cls
./force-app/main/default/classes/LeadController.cls-meta.xml
./force-app/main/default/classes/LeadControllerTest.cls
./force-app/main/default/classes/LeadControllerTest.cls-meta.xml
./force-app/main/default/classes/LeadConvertService.cls
./force-app/main/default/classes/LeadConvertService.cls-meta.xml
./force-app/main/default/classes/LeadConvertServiceTest.cls
./force-app/main/default/classes/LeadConvertServiceTest.cls-meta.xml
./force-app/main/default/classes/ProjectController.cls
./force-app/main/default/classes/ProjectController.cls-meta.xml
./force-app/main/default/classes/ProjectControllerTest.cls
./force-app/main/default/classes/ProjectControllerTest.cls-meta.xml
./force-app/main/default/lwc/caseCreator/__tests__/caseCreator.test.js
./force-app/main/default/lwc/caseCreator/caseCreator.css
./force-app/main/default/lwc/caseCreator/caseCreator.html
./force-app/main/default/lwc/caseCreator/caseCreator.js
./force-app/main/default/lwc/caseCreator/caseCreator.js-meta.xml
./force-app/main/default/lwc/downloadCenter/__tests__/downloadCenter.test.js
./force-app/main/default/lwc/downloadCenter/downloadCenter.css
./force-app/main/default/lwc/downloadCenter/downloadCenter.html
./force-app/main/default/lwc/downloadCenter/downloadCenter.js
./force-app/main/default/lwc/downloadCenter/downloadCenter.js-meta.xml
./force-app/main/default/lwc/emptyStateWrap/emptyStateWrap.html
./force-app/main/default/lwc/emptyStateWrap/emptyStateWrap.js
./force-app/main/default/lwc/emptyStateWrap/emptyStateWrap.js-meta.xml
./force-app/main/default/lwc/errorPanel/errorPanel.html
./force-app/main/default/lwc/errorPanel/errorPanel.js
./force-app/main/default/lwc/errorPanel/errorPanel.js-meta.xml
./force-app/main/default/lwc/eventPlayground/__tests__/eventPlayground.test.js
./force-app/main/default/lwc/eventPlayground/eventPlayground.css
./force-app/main/default/lwc/eventPlayground/eventPlayground.html
./force-app/main/default/lwc/eventPlayground/eventPlayground.js
./force-app/main/default/lwc/eventPlayground/eventPlayground.js-meta.xml
./force-app/main/default/lwc/helloLeadCard/__tests__/helloLeadCard.test.js
./force-app/main/default/lwc/helloLeadCard/helloLeadCard.css
./force-app/main/default/lwc/helloLeadCard/helloLeadCard.html
./force-app/main/default/lwc/helloLeadCard/helloLeadCard.js
./force-app/main/default/lwc/helloLeadCard/helloLeadCard.js-meta.xml
./force-app/main/default/lwc/knowledgeFinder/__tests__/knowledgeFinder.test.js
./force-app/main/default/lwc/knowledgeFinder/knowledgeFinder.css
./force-app/main/default/lwc/knowledgeFinder/knowledgeFinder.html
./force-app/main/default/lwc/knowledgeFinder/knowledgeFinder.js
./force-app/main/default/lwc/knowledgeFinder/knowledgeFinder.js-meta.xml
./force-app/main/default/lwc/leadConvertForm/__tests__/leadConvertForm.test.js
./force-app/main/default/lwc/leadConvertForm/leadConvertForm.css
./force-app/main/default/lwc/leadConvertForm/leadConvertForm.html
./force-app/main/default/lwc/leadConvertForm/leadConvertForm.js
./force-app/main/default/lwc/leadConvertForm/leadConvertForm.js-meta.xml
./force-app/main/default/lwc/leadWorklistTable/__tests__/leadWorklistTable.test.js
./force-app/main/default/lwc/leadWorklistTable/leadWorklistTable.css
./force-app/main/default/lwc/leadWorklistTable/leadWorklistTable.html
./force-app/main/default/lwc/leadWorklistTable/leadWorklistTable.js
./force-app/main/default/lwc/leadWorklistTable/leadWorklistTable.js-meta.xml
./force-app/main/default/lwc/projectIntakeWizard/__tests__/projectIntakeWizard.test.js
./force-app/main/default/lwc/projectIntakeWizard/projectIntakeWizard.css
./force-app/main/default/lwc/projectIntakeWizard/projectIntakeWizard.html
./force-app/main/default/lwc/projectIntakeWizard/projectIntakeWizard.js
./force-app/main/default/lwc/projectIntakeWizard/projectIntakeWizard.js-meta.xml
./force-app/main/default/lwc/recordHeaderWidgets/__tests__/recordHeaderWidgets.test.js
./force-app/main/default/lwc/recordHeaderWidgets/recordHeaderWidgets.css
./force-app/main/default/lwc/recordHeaderWidgets/recordHeaderWidgets.html
./force-app/main/default/lwc/recordHeaderWidgets/recordHeaderWidgets.js
./force-app/main/default/lwc/recordHeaderWidgets/recordHeaderWidgets.js-meta.xml
./force-app/main/default/lwc/utilsLib/utilsLib.js
./force-app/main/default/lwc/utilsLib/utilsLib.js-meta.xml
./force-app/main/default/messageChannels/SearchTerm.messageChannel-meta.xml
./force-app/main/default/objects/Project__c/fields/Budget__c.field-meta.xml
./force-app/main/default/objects/Project__c/fields/Status__c.field-meta.xml
./force-app/main/default/objects/Project__c/Project__c.object-meta.xml
