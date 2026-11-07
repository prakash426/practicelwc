public with sharing class PortalInsightService {
  public class Tile { @AuraEnabled public String label; @AuraEnabled public Integer value; }
  @AuraEnabled(cacheable=true)
  public static List<Tile> getInsights() {
    Integer openCases = [SELECT COUNT() FROM Case WHERE Status != 'Closed' WITH USER_MODE];
    Tile t = new Tile(); t.label = 'Open Cases'; t.value = openCases;
    return new List<Tile>{ t };
  }
}
