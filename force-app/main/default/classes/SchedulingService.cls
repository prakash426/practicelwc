public with sharing class SchedulingService {
  @AuraEnabled(cacheable=true)
  public static List<ServiceAppointment> getDayPlan() {
    return [SELECT Id, Subject, Status, SchedStartTime FROM ServiceAppointment WITH USER_MODE ORDER BY SchedStartTime LIMIT 50];
  }
  @AuraEnabled
  public static void reschedule(Id apptId, Integer shiftHours) {
    ServiceAppointment sa = [SELECT Id, SchedStartTime, SchedEndTime FROM ServiceAppointment WHERE Id = :apptId WITH USER_MODE LIMIT 1];
    if (sa.SchedStartTime != null) sa.SchedStartTime = sa.SchedStartTime.addHours(shiftHours);
    if (sa.SchedEndTime != null) sa.SchedEndTime = sa.SchedEndTime.addHours(shiftHours);
    update as user sa;
  }
}
