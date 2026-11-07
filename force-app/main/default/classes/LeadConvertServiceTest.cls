@IsTest
private class LeadConvertServiceTest {
  @IsTest
  static void convertsLeadToAccount() {
    Lead l = new Lead(LastName = 'ConvertMe', Company = 'ConvertCo', Status = 'New');
    insert l;
    LeadConvertService.ConvertResult r = LeadConvertService.convertLead(l.Id);
    System.assertNotEquals(null, r.accountId, 'Conversion creates an account');
    System.assertNotEquals(null, r.contactId, 'Conversion creates a contact');
  }

  @IsTest
  static void rejectsAlreadyConvertedLead() {
    Lead l = new Lead(LastName = 'Dup', Company = 'DupCo', Status = 'New');
    insert l;
    LeadConvertService.convertLead(l.Id);
    try {
      LeadConvertService.convertLead(l.Id);
      System.assert(false, 'Expected AuraHandledException for converted lead');
    } catch (AuraHandledException e) {
      System.assert(e.getMessage().contains('already converted'));
    }
  }
}
