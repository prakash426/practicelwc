public with sharing class TypedGridService {
  @AuraEnabled(cacheable=true)
  public static List<SObject> queryGrid(String objectApiName, String searchKey, Integer limitSize) {
    if (!Schema.getGlobalDescribe().containsKey(objectApiName)) throw new AuraHandledException('Unknown object');
    Integer lim = Math.min(limitSize == null ? 50 : limitSize, 200);
    String soql = 'SELECT Id, Name FROM ' + String.escapeSingleQuotes(objectApiName) + ' WITH USER_MODE LIMIT :lim';
    return Database.query(soql);
  }
}
