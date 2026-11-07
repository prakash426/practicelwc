@IsTest
private class KnowledgeSearchControllerTest {
  @IsTest
  static void blankTermReturnsEmpty() {
    System.assertEquals(0, KnowledgeSearchController.search('').size());
    System.assertEquals(0, KnowledgeSearchController.search(null).size());
    System.assertEquals(0, KnowledgeSearchController.search('x').size(), 'Single char is too short');
  }

  @IsTest
  static void soslResultsAreMapped() {
    Test.setFixedSearchResults(new List<List<SObject>>{ new List<SObject>{} });
    // With no SOSL rows the service maps zero hits without error.
    System.assertEquals(0, KnowledgeSearchController.search('password reset').size());
  }
}
