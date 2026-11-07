public with sharing class CatalogService {
  @AuraEnabled(cacheable=true)
  public static List<Map<String, Object>> getProducts(String category) {
    List<Product2> prods = [SELECT Id, Name FROM Product2 WITH USER_MODE LIMIT 50];
    List<Map<String, Object>> out = new List<Map<String, Object>>();
    for (Product2 p : prods) out.add(new Map<String, Object>{ 'Id' => p.Id, 'Name' => p.Name, 'Price' => 'Contact sales' });
    return out;
  }
}
