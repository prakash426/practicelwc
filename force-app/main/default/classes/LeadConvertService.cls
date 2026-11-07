public with sharing class LeadConvertService {
  public class ConvertResult {
    @AuraEnabled public Id accountId;
    @AuraEnabled public Id contactId;
    public ConvertResult(Id a, Id c) {
      accountId = a;
      contactId = c;
    }
  }

  @AuraEnabled
  public static ConvertResult convertLead(Id leadId) {
    Lead l = [SELECT Id, IsConverted FROM Lead WHERE Id = :leadId WITH USER_MODE LIMIT 1];
    if (l.IsConverted) {
      throw new AuraHandledException('Lead is already converted.');
    }
    LeadStatus converted = [SELECT MasterLabel FROM LeadStatus WHERE IsConverted = true LIMIT 1];
    Database.LeadConvert lc = new Database.LeadConvert();
    lc.setLeadId(leadId);
    lc.setConvertedStatus(converted.MasterLabel);
    Database.LeadConvertResult r = Database.convertLead(lc);
    if (!r.isSuccess()) {
      throw new AuraHandledException(r.getErrors()[0].getMessage());
    }
    return new ConvertResult(r.getAccountId(), r.getContactId());
  }
}
