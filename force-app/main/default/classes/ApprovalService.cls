public with sharing class ApprovalService {
    @AuraEnabled(cacheable=true)
    public static List<Approval_Request__c> getPendingRequests() {
        return [
            SELECT Id, Name, Status__c, Requested_Discount__c, Comments__c, Opportunity__r.Name
            FROM Approval_Request__c WHERE Status__c = 'Pending' WITH USER_MODE ORDER BY CreatedDate DESC LIMIT 200
        ];
    }

    public class CommentUpdate {
        @AuraEnabled public Id Id;
        @AuraEnabled public String Comments__c;
    }

    @AuraEnabled
    public static void updateComments(List<CommentUpdate> updates) {
        List<Approval_Request__c> rows = new List<Approval_Request__c>();
        for (CommentUpdate u : updates) {
            rows.add(new Approval_Request__c(Id = u.Id, Comments__c = u.Comments__c));
        }
        update as user rows;
    }

    @AuraEnabled
    public static void decideRequest(Id requestId, Boolean approved, String comments) {
        if (requestId == null) throw new AuraHandledException('Request Id is required.');
        if (approved == null) throw new AuraHandledException('Decision is required.');
        if (!approved && String.isBlank(comments)) throw new AuraHandledException('Rejection requires comments.');
        Approval_Request__c r = new Approval_Request__c(
            Id = requestId,
            Status__c = approved ? 'Approved' : 'Rejected',
            Comments__c = comments
        );
        update as user r;
    }
}
