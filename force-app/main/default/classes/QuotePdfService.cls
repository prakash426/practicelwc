public with sharing class QuotePdfService implements Schedulable {
  @AuraEnabled
  public static String generatePdf(Id quoteId) {
    if (!Schema.sObjectType.Quote.isAccessible()) throw new AuraHandledException('No access to Quote');
    Quote q = [SELECT Id, Name, GrandTotal FROM Quote WHERE Id = :quoteId WITH USER_MODE LIMIT 1];
    Blob pdf = Blob.valueOf('QUOTE:' + q.Name + ':' + String.valueOf(q.GrandTotal));
    ContentVersion cv = new ContentVersion(Title = 'Quote-' + q.Name + '.pdf', PathOnClient = 'quote.pdf', VersionData = pdf);
    insert as user cv;
    insert as user new ContentDocumentLink(ContentDocumentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id WITH USER_MODE LIMIT 1].ContentDocumentId, LinkedEntityId = quoteId);
    return EncodingUtil.base64Encode(pdf);
  }
  @InvocableMethod(label='Email Quote PDF') public static void emailQuotes(List<Id> ids) { for (Id i : ids) { Messaging.SingleEmailMessage m = new Messaging.SingleEmailMessage(); m.setTargetObjectId(UserInfo.getUserId()); m.setSubject('Quote PDF'); m.setPlainTextBody('Quote ' + i + ' attached.'); m.setSaveAsActivity(false); Messaging.sendEmail(new List<Messaging.Email>{ m }); } }
  public void execute(SchedulableContext sc) { }
}
