@IsTest
private class OppExplorerServiceTest {
    @IsTest static void returnsOpps() {
        insert new Opportunity(Name = 'T', StageName = 'Proposal', CloseDate = Date.today().addDays(7));
        List<Opportunity> rows = OppExplorerService.getOpportunities();
        System.assertEquals(1, rows.size());
    }
    @IsTest static void emptyWhenNone() {
        System.assertEquals(0, OppExplorerService.getOpportunities().size());
    }
}
