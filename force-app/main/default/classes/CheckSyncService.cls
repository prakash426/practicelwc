public with sharing class CheckSyncService {
  @AuraEnabled
  public static Integer syncReadings(String payload) {
    List<Object> items = (List<Object>) JSON.deserializeUntyped(payload);
    List<Parameter_Reading__c> rows = new List<Parameter_Reading__c>();
    Integer breaches = 0;
    for (Object o : items) {
      Map<String, Object> m = (Map<String, Object>) o;
      Parameter_Reading__c r = new Parameter_Reading__c(
        Parameter__c = String.valueOf(m.get('param')),
        Value__c = Decimal.valueOf(String.valueOf(m.get('value')))
      );
      rows.add(r);
      if (m.get('breach') == true) breaches++;
    }
    if (!rows.isEmpty()) insert as user rows;
    if (breaches > 0) insert as user new Case(Subject = 'Threshold breach x' + breaches, Origin = 'Field');
    return rows.size();
  }
}
