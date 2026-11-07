@IsTest
private class ProjectControllerTest {
  @IsTest
  static void returnsProjectsOrderedByName() {
    insert new List<Project__c>{
      new Project__c(Name = 'Zebra Fit-Out', Status__c = 'New', Budget__c = 1000),
      new Project__c(Name = 'Alpha Refit', Status__c = 'In Progress', Budget__c = 2500)
    };
    List<Project__c> result = ProjectController.getProjects();
    System.assertEquals(2, result.size());
    System.assertEquals('Alpha Refit', result[0].Name, 'Ordered by name ascending');
  }
}
