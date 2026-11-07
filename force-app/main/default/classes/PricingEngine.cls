public with sharing class PricingEngine {
  public class LineItem { public String id; public String name; public Decimal qty; public Decimal listPrice; public Decimal discount; }
  public class PricedLine { public String id; public String name; public Decimal qty; public Decimal unitPrice; public Decimal extended; }
  public class PriceResult { public List<PricedLine> lines; public Decimal total; public Boolean requiresApproval; }
  @AuraEnabled
  public static PriceResult priceQuote(String linesJson) {
    List<LineItem> items = (List<LineItem>) JSON.deserialize(linesJson, List<LineItem>.class);
    PriceResult res = new PriceResult();
    res.lines = new List<PricedLine>(); res.total = 0; res.requiresApproval = false;
    for (LineItem it : items) {
      if (it.qty == null || it.qty < 0 || it.listPrice == null || it.listPrice < 0) {
        throw new AuraHandledException('Invalid qty/price for ' + it.name);
      }
      Decimal disc = it.discount == null ? 0 : it.discount;
      Decimal unit = it.listPrice * (1 - disc / 100);
      PricedLine pl = new PricedLine();
      pl.id = it.id; pl.name = it.name; pl.qty = it.qty; pl.unitPrice = unit.setScale(2); pl.extended = (unit * it.qty).setScale(2);
      res.lines.add(pl); res.total += pl.extended;
      if (disc > 20) res.requiresApproval = true;
    }
    res.total = res.total.setScale(2);
    return res;
  }
}
