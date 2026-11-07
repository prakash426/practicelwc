@IsTest private class QuotePdfServiceTest {
  @IsTest static void generatesAndLinks() {
    Account a = new Account(Name = 'Acme'); insert a;
    Opportunity o = new Opportunity(Name = 'O', StageName = 'Prospecting', CloseDate = Date.today(), AccountId = a.Id); insert o;
    Quote q = new Quote(Name = 'Q1', OpportunityId = o.Id, Pricebook2Id = Test.getStandardPricebookId()); insert q;
    Test.startTest();
    String b64 = QuotePdfService.generatePdf(q.Id);
    QuotePdfService.emailQuotes(new List<Id>{ q.Id });
    String jobId = System.schedule('pdf-test', '0 0 0 1 1 ?', new QuotePdfService());
    Test.stopTest();
    System.assertNotEquals(null, b64);
    System.assertNotEquals(null, jobId);
    System.assertEquals(1, [SELECT COUNT() FROM ContentDocumentLink WHERE LinkedEntityId = :q.Id]);
  }
}
