@IsTest
private class DiscountServiceTest {
    private static Opportunity makeOpp(Decimal amt, String stage, String rating) {
        Account a = new Account(Name = 'Test Acct', Rating = rating);
        insert a;
        return new Opportunity(Name = 'T', AccountId = a.Id, Amount = amt, StageName = stage, CloseDate = Date.today().addDays(30));
    }
    @IsTest static void eligibleHighValue() {
        insert makeOpp(150000, 'Proposal', 'Hot');
        DiscountService.Eligibility e = DiscountService.checkEligibility([SELECT Id FROM Opportunity LIMIT 1].Id);
        System.assertEquals(true, e.eligible);
        System.assertEquals(20, e.maxDiscount);
        System.assertEquals(3, e.rules.size());
    }
    @IsTest static void blockedLowAmount() {
        insert makeOpp(500, 'Proposal', 'Hot');
        DiscountService.Eligibility e = DiscountService.checkEligibility([SELECT Id FROM Opportunity LIMIT 1].Id);
        System.assertEquals(false, e.eligible);
        System.assertEquals(0, e.maxDiscount);
    }
    @IsTest static void blockedClosedStage() {
        insert makeOpp(50000, 'Closed Won', 'Hot');
        DiscountService.Eligibility e = DiscountService.checkEligibility([SELECT Id FROM Opportunity LIMIT 1].Id);
        System.assertEquals(false, e.eligible);
    }
    @IsTest static void blockedColdAccount() {
        insert makeOpp(50000, 'Negotiation', 'Cold');
        DiscountService.Eligibility e = DiscountService.checkEligibility([SELECT Id FROM Opportunity LIMIT 1].Id);
        System.assertEquals(false, e.eligible);
    }
    @IsTest static void nullIdThrows() {
        try {
            DiscountService.checkEligibility(null);
            System.assert(false, 'expected exception');
        } catch (AuraHandledException ex) {
            System.assert(ex.getMessage().contains('required'));
        }
    }
}
