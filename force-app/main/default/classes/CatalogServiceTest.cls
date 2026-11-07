@IsTest private class CatalogServiceTest {
  @IsTest static void returnsProducts() {
    insert new Product2(Name = 'Widget');
    System.assertEquals(1, CatalogService.getProducts('All').size());
  }
}
