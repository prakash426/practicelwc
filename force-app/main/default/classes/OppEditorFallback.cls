// Fallback write path when GraphQL mutations are unavailable. Client-side only uses
// this org-side service in degraded mode; primary path is executeMutation (no Apex).
public with sharing class OppEditorFallback {
    @AuraEnabled
    public static void updateOpportunity(Id oppId, String name, Decimal amount) {
        if (oppId == null) throw new AuraHandledException('Opportunity Id is required.');
        update as user new Opportunity(Id = oppId, Name = name, Amount = amount);
    }
    @AuraEnabled
    public static void deleteOpportunity(Id oppId) {
        if (oppId == null) throw new AuraHandledException('Opportunity Id is required.');
        delete as user new Opportunity(Id = oppId);
    }
}
