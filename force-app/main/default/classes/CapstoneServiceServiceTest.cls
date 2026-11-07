@IsTest private class CapstoneServiceServiceTest {
  @IsTest static void testThread() {
    insert as user new Case(Subject = 'x', Status = 'New');
    System.assertEquals(1, CapstoneServiceService.getThread().size());
  }
}
