@IsTest private class TypedGridServiceTest {
  @IsTest static void queriesAndRejects() {
    insert new Account(Name = 'G');
    System.assertEquals(1, TypedGridService.queryGrid('Account', '', 10).size());
    try { TypedGridService.queryGrid('Nope__c', '', 10); System.assert(false); }
    catch (AuraHandledException e) { System.assert(true); }
  }
}
