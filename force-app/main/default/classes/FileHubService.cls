public with sharing class FileHubService {
  @AuraEnabled(cacheable=true)
  public static List<Map<String, Object>> listFiles(Id parentId) {
    List<ContentDocumentLink> links = [SELECT ContentDocumentId, ContentDocument.Title FROM ContentDocumentLink WHERE LinkedEntityId = :parentId WITH USER_MODE LIMIT 50];
    List<Map<String, Object>> out = new List<Map<String, Object>>();
    for (ContentDocumentLink l : links) out.add(new Map<String, Object>{ 'Id' => l.ContentDocumentId, 'Title' => l.ContentDocument.Title });
    return out;
  }
  @AuraEnabled
  public static String downloadFile(Id docId) {
    ContentVersion cv = [SELECT VersionData FROM ContentVersion WHERE ContentDocumentId = :docId AND IsLatest = true WITH USER_MODE LIMIT 1];
    return EncodingUtil.base64Encode(cv.VersionData);
  }
}
