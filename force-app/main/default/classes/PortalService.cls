// Portal-safe: with sharing + USER_MODE so partners only see their own account's cases.
public with sharing class PortalService {
    @AuraEnabled(cacheable=true)
    public static List<Case> getMyCases() {
        Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId() WITH USER_MODE LIMIT 1].AccountId;
        if (accountId == null) return new List<Case>();
        return [
            SELECT Id, CaseNumber, Subject, Status
            FROM Case WHERE AccountId = :accountId WITH USER_MODE ORDER BY CreatedDate DESC LIMIT 100
        ];
    }

    @AuraEnabled
    public static List<ContentDocument> getCaseFiles(Id caseId) {
        if (caseId == null) throw new AuraHandledException('Case Id is required.');
        Set<Id> docIds = new Set<Id>();
        for (ContentDocumentLink l : [
            SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :caseId WITH USER_MODE
        ]) {
            docIds.add(l.ContentDocumentId);
        }
        if (docIds.isEmpty()) return new List<ContentDocument>();
        return [SELECT Id, Title, ContentSize FROM ContentDocument WHERE Id IN :docIds WITH USER_MODE LIMIT 50];
    }
}
