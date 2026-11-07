@IsTest private class RoutingServiceTest {
  @IsTest static void testRoute() {
    insert as user new Case(Subject = 't', Status = 'New', Origin = 'bot');
    Case c = [SELECT Id FROM Case LIMIT 1];
    RoutingService.routeCase(c.Id, 'General');
    System.assertEquals('Working', [SELECT Status FROM Case WHERE Id = :c.Id].Status);
    System.assertEquals(0, RoutingService.getQueue().size());
  }
}
