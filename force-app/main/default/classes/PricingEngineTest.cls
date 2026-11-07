@IsTest private class PricingEngineTest {
  @IsTest static void pricesThreeTierBundle() {
    String json = '[{"id":"p1","name":"A","qty":2,"listPrice":100,"discount":10},{"id":"p2","name":"B","qty":1,"listPrice":200,"discount":0},{"id":"p3","name":"C","qty":3,"listPrice":50,"discount":20}]';
    PricingEngine.PriceResult r = PricingEngine.priceQuote(json);
    System.assertEquals(3, r.lines.size());
    System.assertEquals(500.00, r.total);
    System.assertEquals(false, r.requiresApproval);
  }
  @IsTest static void flagsApprovalOver20() {
    String json = '[{"id":"p1","name":"A","qty":1,"listPrice":100,"discount":25}]';
    PricingEngine.PriceResult r = PricingEngine.priceQuote(json);
    System.assertEquals(true, r.requiresApproval);
    System.assertEquals(75.00, r.total);
  }
  @IsTest static void rejectsNegative() {
    try { PricingEngine.priceQuote('[{"id":"x","name":"X","qty":-1,"listPrice":10,"discount":0}]'); System.assert(false, 'should throw'); }
    catch (AuraHandledException e) { System.assert(e.getMessage().contains('Invalid')); }
  }
}
