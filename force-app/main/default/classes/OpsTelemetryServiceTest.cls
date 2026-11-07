@IsTest private class OpsTelemetryServiceTest {
  @IsTest static void telemetryAndSnapshot() {
    List<OpsTelemetryService.Point> pts = OpsTelemetryService.getTelemetry('hour', 10);
    System.assertEquals(10, pts.size());
    OpsTelemetryService.emailSnapshot('hour');
    System.assertEquals(1, Limits.getEmailInvocations());
  }
}
