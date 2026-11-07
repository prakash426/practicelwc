public with sharing class MacroService {
    private static final Map<String, String> MACRO_SUBJECTS = new Map<String, String>{
        'first_response' => 'First response sent',
        'escalate' => 'Escalated to Tier 2',
        'close_resolved' => 'Closed as resolved'
    };

    @AuraEnabled(cacheable=true)
    public static List<Task> getCaseTasks(Id caseId) {
        if (caseId == null) return new List<Task>();
        return [
            SELECT Id, Subject, Status, ActivityDate
            FROM Task WHERE WhatId = :caseId WITH USER_MODE ORDER BY CreatedDate DESC LIMIT 50
        ];
    }

    @AuraEnabled
    public static Id runMacro(Id caseId, String macroName) {
        if (caseId == null) throw new AuraHandledException('Case Id is required.');
        if (!MACRO_SUBJECTS.containsKey(macroName)) throw new AuraHandledException('Unknown macro: ' + macroName);
        Task t = new Task(WhatId = caseId, Subject = MACRO_SUBJECTS.get(macroName), Status = 'Completed');
        insert as user t;
        if (macroName == 'close_resolved') {
            update as user new Case(Id = caseId, Status = 'Closed');
        } else if (macroName == 'escalate') {
            update as user new Case(Id = caseId, Priority = 'High');
        }
        return t.Id;
    }
}
