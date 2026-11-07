@IsTest
private class PortalServiceTest {
    @IsTest static void internalUserWithoutAccountSeesNothing() {
        // Running user has no AccountId -> empty, and no cross-account leakage possible.
        System.assertEquals(0, PortalService.getMyCases().size());
    }
    @IsTest static void nullCaseThrows() {
        try {
            PortalService.getCaseFiles(null);
            System.assert(false, 'expected exception');
        } catch (AuraHandledException ex) {
            System.assert(ex.getMessage().contains('required'));
        }
    }
    @IsTest static void caseWithoutFilesReturnsEmpty() {
        Case c = new Case(Subject = 'x', Status = 'New', Origin = 'Web');
        insert c;
        System.assertEquals(0, PortalService.getCaseFiles(c.Id).size());
    }
}
