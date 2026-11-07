public with sharing class ConsentService {
  public class ConsentRow {
    @AuraEnabled public Id contactId; @AuraEnabled public String contactName;
    @AuraEnabled public String purpose; @AuraEnabled public Boolean optIn;
  }
  @AuraEnabled(cacheable=true)
  public static List<ConsentRow> getConsents(String brand) {
    List<ConsentRow> rows = new List<ConsentRow>();
    for (Contact c : [SELECT Id, Name, (SELECT Id, Purpose__c, Opt_In__c FROM Consents__r WHERE Brand__c = :brand WITH USER_MODE) FROM Contact WITH USER_MODE LIMIT 200]) {
      for (Consent__c k : c.Consents__r) {
        ConsentRow r = new ConsentRow();
        r.contactId = c.Id; r.contactName = c.Name; r.purpose = k.Purpose__c; r.optIn = k.Opt_In__c;
        rows.add(r);
      }
    }
    return rows;
  }
  @AuraEnabled
  public static Id logIdentityEvent(Id contactId, String purpose, String action) {
    Identity_Event__c e = new Identity_Event__c(Contact__c = contactId, Purpose__c = purpose, Action__c = action);
    insert as user e;
    return e.Id;
  }
}
