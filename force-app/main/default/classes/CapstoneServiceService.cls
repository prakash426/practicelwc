public with sharing class CapstoneServiceService {
  @AuraEnabled(cacheable=true)
  public static List<Case> getThread() {
    return [SELECT Id, Subject, Status FROM Case WITH USER_MODE ORDER BY CreatedDate DESC LIMIT 50];
  }
}
