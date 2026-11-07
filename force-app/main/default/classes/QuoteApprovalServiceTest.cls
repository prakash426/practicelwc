@IsTest
private class QuoteApprovalServiceTest {
    @IsTest static void createsPendingRequest() {
        Opportunity o = new Opportunity(Name = 'T', StageName = 'Proposal', CloseDate = Date.today().addDays(7));
        insert o;
        Id id = QuoteApprovalService.createApprovalRequest(o.Id, 12.5);
        Approval_Request__c r = [SELECT Status__c, Requested_Discount__c FROM Approval_Request__c WHERE Id = :id];
        System.assertEquals('Pending', r.Status__c);
        System.assertEquals(12.5, r.Requested_Discount__c);
    }
    @IsTest static void rejectsBadDiscount() {
        Opportunity o = new Opportunity(Name = 'T', StageName = 'Proposal', CloseDate = Date.today().addDays(7));
        insert o;
        try {
            QuoteApprovalService.createApprovalRequest(o.Id, 150);
            System.assert(false, 'expected exception');
        } catch (AuraHandledException ex) {
            System.assert(ex.getMessage().contains('between 0 and 100'));
        }
    }
    @IsTest static void rejectsNullOpp() {
        try {
            QuoteApprovalService.createApprovalRequest(null, 10);
            System.assert(false, 'expected exception');
        } catch (AuraHandledException ex) {
            System.assert(ex.getMessage().contains('required'));
        }
    }
}
