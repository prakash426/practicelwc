@IsTest private class SchedulingServiceTest {
  @IsTest static void dayPlanAndReschedule() {
    ServiceAppointment sa = new ServiceAppointment(Subject = 'Fix', Status = 'Scheduled', SchedStartTime = DateTime.now(), SchedEndTime = DateTime.now().addHours(2));
    insert sa;
    System.assertEquals(1, SchedulingService.getDayPlan().size());
    SchedulingService.reschedule(sa.Id, 1);
    ServiceAppointment after = [SELECT SchedStartTime FROM ServiceAppointment WHERE Id = :sa.Id];
    System.assert(after.SchedStartTime > sa.SchedStartTime);
  }
}
