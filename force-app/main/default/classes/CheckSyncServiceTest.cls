@IsTest private class CheckSyncServiceTest {
  @IsTest static void testSyncWithBreach() {
    String payload = '[{"param":"Vibration","value":95,"breach":true},{"param":"Temp","value":20,"breach":false}]';
    Integer n = CheckSyncService.syncReadings(payload);
    System.assertEquals(2, n);
    System.assertEquals(1, [SELECT COUNT() FROM Case WITH USER_MODE]);
  }
  @IsTest static void testSyncEmpty() {
    System.assertEquals(0, CheckSyncService.syncReadings('[]'));
  }
}
