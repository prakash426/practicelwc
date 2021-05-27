public with sharing class AccountRecordController {
    
    @AuraEnabled (cacheable=true)
    public static List<Account> displayAccounts(){

            return[Select ID,Name from Account WITH SECURITY_ENFORCED LIMIT 2];
    }
}

