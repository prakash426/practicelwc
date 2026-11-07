public with sharing class LeadController {
  @AuraEnabled(cacheable=true)
  public static List<Lead> getNewLeads() {
    return [
      SELECT Id, Name, Company, Status, Email
      FROM Lead
      WHERE Status = 'New'
      WITH USER_MODE
      ORDER BY CreatedDate DESC
      LIMIT 50
    ];
  }
}
