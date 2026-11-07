public with sharing class CartService {
    public class CartLine {
        @AuraEnabled public Id Id;
        @AuraEnabled public String ProductName;
        @AuraEnabled public Decimal Quantity;
        @AuraEnabled public Decimal UnitPrice;
        @AuraEnabled public Decimal LineTotal;
    }
    @AuraEnabled(cacheable=true)
    public static List<CartLine> getCartLines() {
        List<CartLine> out = new List<CartLine>();
        for (OpportunityLineItem oli : [
            SELECT Id, Quantity, UnitPrice, TotalPrice, Product2.Name
            FROM OpportunityLineItem WITH USER_MODE ORDER BY CreatedDate DESC LIMIT 50
        ]) {
            CartLine c = new CartLine();
            c.Id = oli.Id;
            c.ProductName = oli.Product2 != null ? oli.Product2.Name : 'Item';
            c.Quantity = oli.Quantity;
            c.UnitPrice = oli.UnitPrice;
            c.LineTotal = oli.TotalPrice;
            out.add(c);
        }
        return out;
    }
}
