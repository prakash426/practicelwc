@IsTest
private class OppEditorFallbackTest {
    @IsTest static void updateAndDelete() {
        Opportunity o = new Opportunity(Name = 'T', StageName = 'Proposal', CloseDate = Date.today().addDays(7));
        insert o;
        OppEditorFallback.updateOpportunity(o.Id, 'Renamed', 42000);
        System.assertEquals('Renamed', [SELECT Name FROM Opportunity WHERE Id = :o.Id].Name);
        OppEditorFallback.deleteOpportunity(o.Id);
        System.assertEquals(0, [SELECT COUNT() FROM Opportunity WHERE Id = :o.Id]);
    }
    @IsTest static void nullGuards() {
        try { OppEditorFallback.updateOpportunity(null, 'x', 1); System.assert(false); }
        catch (AuraHandledException ex) { System.assert(ex.getMessage().contains('required')); }
        try { OppEditorFallback.deleteOpportunity(null); System.assert(false); }
        catch (AuraHandledException ex) { System.assert(ex.getMessage().contains('required')); }
    }
}
