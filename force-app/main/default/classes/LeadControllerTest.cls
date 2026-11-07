@IsTest
private class LeadControllerTest {
  @IsTest
  static void returnsOnlyNewLeads() {
    insert new List<Lead>{
      new Lead(LastName = 'NewOne', Company = 'Acme', Status = 'New'),
      new Lead(LastName = 'WorkingOne', Company = 'Acme', Status = 'Working')
    };
    List<Lead> result = LeadController.getNewLeads();
    System.assertEquals(1, result.size(), 'Only New leads are returned');
    System.assertEquals('NewOne', result[0].LastName);
  }
}
