public with sharing class QuoteApprovalService {
    @AuraEnabled
    public static Id createApprovalRequest(Id opportunityId, Decimal discountPercent) {
        if (opportunityId == null) throw new AuraHandledException('Opportunity Id is required.');
        if (discountPercent == null || discountPercent < 0 || discountPercent > 100) {
            throw new AuraHandledException('Discount must be between 0 and 100.');
        }
        Approval_Request__c r = new Approval_Request__c(
            Opportunity__c = opportunityId,
            Requested_Discount__c = discountPercent,
            Status__c = 'Pending'
        );
        insert as user r;
        return r.Id;
    }
}
