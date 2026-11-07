public with sharing class ProjectController {
  @AuraEnabled(cacheable=true)
  public static List<Project__c> getProjects() {
    return [
      SELECT Id, Name, Status__c, Budget__c
      FROM Project__c
      WITH USER_MODE
      ORDER BY Name ASC
      LIMIT 200
    ];
  }
}
