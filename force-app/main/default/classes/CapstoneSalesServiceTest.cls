@IsTest private class CapstoneSalesServiceTest {
  @IsTest static void testConvert() {
    Lead l = new Lead(Company = 'Acme', LastName = 'X', Status = 'New'); insert as user l;
    Id acct = CapstoneSalesService.convertLead(l.Id);
    System.assertNotEquals(null, acct);
  }
}
