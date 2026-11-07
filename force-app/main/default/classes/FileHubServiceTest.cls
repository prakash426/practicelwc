@IsTest private class FileHubServiceTest {
  @IsTest static void listAndDownload() {
    Account a = new Account(Name = 'A'); insert a;
    ContentVersion cv = new ContentVersion(Title = 't.pdf', PathOnClient = 't.pdf', VersionData = Blob.valueOf('hi'));
    insert cv;
    Id docId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id LIMIT 1].ContentDocumentId;
    insert new ContentDocumentLink(ContentDocumentId = docId, LinkedEntityId = a.Id);
    System.assertEquals(1, FileHubService.listFiles(a.Id).size());
    System.assertNotEquals(null, FileHubService.downloadFile(docId));
  }
}
