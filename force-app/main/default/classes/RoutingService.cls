public with sharing class RoutingService {
  @AuraEnabled(cacheable=true)
  public static List<Case> getQueue() {
    return [SELECT Id, Subject, Origin, Status FROM Case WHERE Status = 'New' WITH USER_MODE LIMIT 100];
  }
  @AuraEnabled
  public static void routeCase(Id caseId, String skill) {
    Case c = [SELECT Id, Status FROM Case WHERE Id = :caseId WITH USER_MODE];
    c.Status = 'Working';
    update as user c;
    EventBus.publish(new Routing_Event__e(CaseId__c = caseId, Skill__c = skill));
  }
}
