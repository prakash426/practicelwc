// Fallback read path when GraphQL is unavailable (e.g. API-disabled orgs).
public with sharing class OppExplorerService {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [
            SELECT Id, Name, Amount, StageName, Account.Name,
                (SELECT Id, Quantity, TotalPrice, Product2.Name FROM OpportunityLineItems LIMIT 25)
            FROM Opportunity WITH USER_MODE ORDER BY CloseDate DESC LIMIT 50
        ];
    }
}
