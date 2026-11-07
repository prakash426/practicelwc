@IsTest
private class CartServiceTest {
    @IsTest static void emptyWithoutLines() {
        System.assertEquals(0, CartService.getCartLines().size());
    }
    @IsTest static void returnsLines() {
        Product2 p = new Product2(Name = 'Widget');
        insert p;
        Pricebook2 std = [SELECT Id FROM Pricebook2 WHERE IsStandard = true LIMIT 1];
        PricebookEntry pbe = new PricebookEntry(Pricebook2Id = std.Id, Product2Id = p.Id, UnitPrice = 100, IsActive = true);
        insert pbe;
        Opportunity o = new Opportunity(Name = 'T', StageName = 'Proposal', CloseDate = Date.today().addDays(7), Pricebook2Id = std.Id);
        insert o;
        insert new OpportunityLineItem(OpportunityId = o.Id, PricebookEntryId = pbe.Id, Quantity = 2, TotalPrice = 200);
        List<CartService.CartLine> lines = CartService.getCartLines();
        System.assertEquals(1, lines.size());
        System.assertEquals('Widget', lines[0].ProductName);
        System.assertEquals(200, lines[0].LineTotal);
    }
}
