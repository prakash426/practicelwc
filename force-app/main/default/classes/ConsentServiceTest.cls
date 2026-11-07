@IsTest private class ConsentServiceTest {
  @IsTest static void testGetAndLog() {
    Account a = new Account(Name = 'BrandA Acct'); insert as user a;
    Contact c = new Contact(LastName = 'Test', AccountId = a.Id); insert as user c;
    insert as user new Consent__c(Contact__c = c.Id, Brand__c = 'BrandA', Purpose__c = 'Marketing', Opt_In__c = true);
    List<ConsentService.ConsentRow> rows = ConsentService.getConsents('BrandA');
    System.assertEquals(1, rows.size());
    System.assertEquals(0, ConsentService.getConsents('BrandB').size());
    Id eid = ConsentService.logIdentityEvent(c.Id, 'Marketing', 'OPT_OUT');
    System.assertNotEquals(null, eid);
  }
}
