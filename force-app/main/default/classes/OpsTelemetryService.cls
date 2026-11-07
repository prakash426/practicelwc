public with sharing class OpsTelemetryService {
  public class Point { @AuraEnabled public String bucket; @AuraEnabled public Decimal value; }
  @AuraEnabled(cacheable=true)
  public static List<Point> getTelemetry(String groupBy, Integer limitSize) {
    Integer lim = Math.min(limitSize == null ? 500 : limitSize, 2000);
    List<Point> out = new List<Point>();
    for (Integer i = 0; i < Math.min(lim, 100); i++) { Point p = new Point(); p.bucket = groupBy + '-' + i; p.value = i * 1.5; out.add(p); }
    return out;
  }
  @AuraEnabled
  public static void emailSnapshot(String groupBy) {
    Messaging.SingleEmailMessage m = new Messaging.SingleEmailMessage();
    m.setTargetObjectId(UserInfo.getUserId()); m.setSubject('Ops snapshot ' + groupBy);
    m.setPlainTextBody('Snapshot grouped by ' + groupBy); m.setSaveAsActivity(false);
    Messaging.sendEmail(new List<Messaging.Email>{ m });
  }
}
