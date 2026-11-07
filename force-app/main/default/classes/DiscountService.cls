public with sharing class DiscountService {
    public class RuleResult {
        @AuraEnabled public String name;
        @AuraEnabled public String detail;
        @AuraEnabled public Boolean passed;
        public RuleResult(String n, String d, Boolean p) { name = n; detail = d; passed = p; }
    }
    public class Eligibility {
        @AuraEnabled public Boolean eligible;
        @AuraEnabled public Decimal maxDiscount;
        @AuraEnabled public List<RuleResult> rules;
    }

    @AuraEnabled
    public static Eligibility checkEligibility(Id opportunityId) {
        if (opportunityId == null) {
            throw new AuraHandledException('Opportunity Id is required.');
        }
        Opportunity o = [
            SELECT Id, Amount, StageName, Account.Rating
            FROM Opportunity WHERE Id = :opportunityId WITH USER_MODE LIMIT 1
        ];
        List<RuleResult> rules = new List<RuleResult>();
        Boolean amountOk = o.Amount != null && o.Amount >= 10000;
        rules.add(new RuleResult('Amount >= 10k', 'Amount is ' + o.Amount, amountOk));
        Boolean stageOk = o.StageName != 'Closed Won' && o.StageName != 'Closed Lost';
        rules.add(new RuleResult('Open stage', 'Stage is ' + o.StageName, stageOk));
        Boolean ratingOk = o.AccountId == null || o.Account.Rating != 'Cold';
        rules.add(new RuleResult('Account not Cold', 'Rating is ' + (o.AccountId == null ? 'n/a' : o.Account.Rating), ratingOk));
        Eligibility e = new Eligibility();
        e.rules = rules;
        e.eligible = amountOk && stageOk && ratingOk;
        e.maxDiscount = e.eligible ? (o.Amount >= 100000 ? 20 : 10) : 0;
        return e;
    }
}
