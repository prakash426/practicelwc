public with sharing class CapstoneSalesService {
  @AuraEnabled
  public static Id convertLead(Id leadId) {
    Lead l = [SELECT Id, Company, LastName, Status FROM Lead WHERE Id = :leadId WITH USER_MODE];
    Database.LeadConvert lc = new Database.LeadConvert();
    lc.setLeadId(l.Id);
    Database.LeadConvertResult r = Database.convertLead(lc);
    return r.getAccountId();
  }
}
