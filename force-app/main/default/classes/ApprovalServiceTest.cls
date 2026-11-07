@IsTest
private class ApprovalServiceTest {
    private static Approval_Request__c makeReq(String status) {
        Opportunity o = new Opportunity(Name = 'T', StageName = 'Proposal', CloseDate = Date.today().addDays(7));
        insert o;
        return new Approval_Request__c(Status__c = status, Requested_Discount__c = 12, Opportunity__c = o.Id);
    }
    @IsTest static void pendingOnly() {
        insert new List<Approval_Request__c>{ makeReq('Pending'), makeReq('Approved') };
        List<Approval_Request__c> rows = ApprovalService.getPendingRequests();
        System.assertEquals(1, rows.size());
        System.assertEquals('Pending', rows[0].Status__c);
    }
    @IsTest static void approvePath() {
        insert makeReq('Pending');
        Id id = [SELECT Id FROM Approval_Request__c LIMIT 1].Id;
        ApprovalService.decideRequest(id, true, 'Looks good');
        System.assertEquals('Approved', [SELECT Status__c FROM Approval_Request__c WHERE Id = :id].Status__c);
    }
    @IsTest static void rejectNeedsComments() {
        insert makeReq('Pending');
        Id id = [SELECT Id FROM Approval_Request__c LIMIT 1].Id;
        try {
            ApprovalService.decideRequest(id, false, '');
            System.assert(false, 'expected exception');
        } catch (AuraHandledException ex) {
            System.assert(ex.getMessage().contains('comments'));
        }
    }
    @IsTest static void inlineCommentSave() {
        insert makeReq('Pending');
        Id id = [SELECT Id FROM Approval_Request__c LIMIT 1].Id;
        ApprovalService.CommentUpdate u = new ApprovalService.CommentUpdate();
        u.Id = id; u.Comments__c = 'ping finance';
        ApprovalService.updateComments(new List<ApprovalService.CommentUpdate>{ u });
        System.assertEquals('ping finance', [SELECT Comments__c FROM Approval_Request__c WHERE Id = :id].Comments__c);
    }
}
