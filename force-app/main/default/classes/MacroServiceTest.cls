@IsTest
private class MacroServiceTest {
    private static Id makeCase() {
        Case c = new Case(Subject = 'Help', Status = 'New', Origin = 'Web');
        insert c;
        return c.Id;
    }
    @IsTest static void firstResponseLogsTask() {
        Id caseId = makeCase();
        Id taskId = MacroService.runMacro(caseId, 'first_response');
        System.assertNotEquals(null, taskId);
        System.assertEquals(1, MacroService.getCaseTasks(caseId).size());
    }
    @IsTest static void closeResolvedClosesCase() {
        Id caseId = makeCase();
        MacroService.runMacro(caseId, 'close_resolved');
        System.assertEquals('Closed', [SELECT Status FROM Case WHERE Id = :caseId].Status);
    }
    @IsTest static void escalateRaisesPriority() {
        Id caseId = makeCase();
        MacroService.runMacro(caseId, 'escalate');
        System.assertEquals('High', [SELECT Priority FROM Case WHERE Id = :caseId].Priority);
    }
    @IsTest static void unknownMacroThrows() {
        try {
            MacroService.runMacro(makeCase(), 'nope');
            System.assert(false, 'expected exception');
        } catch (AuraHandledException ex) {
            System.assert(ex.getMessage().contains('Unknown macro'));
        }
    }
    @IsTest static void nullCaseReturnsEmpty() {
        System.assertEquals(0, MacroService.getCaseTasks(null).size());
    }
}
