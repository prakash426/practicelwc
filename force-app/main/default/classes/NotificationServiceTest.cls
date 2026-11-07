@IsTest
private class NotificationServiceTest {
    @IsTest static void blankTypeThrows() {
        try {
            NotificationService.sendNotification('', 't', 'b', null, new Set<Id>{ UserInfo.getUserId() });
            System.assert(false, 'expected exception');
        } catch (AuraHandledException ex) {
            System.assert(ex.getMessage().contains('type'));
        }
    }
    @IsTest static void emptyRecipientsThrows() {
        try {
            NotificationService.sendNotification('Some_Type', 't', 'b', null, new Set<Id>());
            System.assert(false, 'expected exception');
        } catch (AuraHandledException ex) {
            System.assert(ex.getMessage().contains('recipient'));
        }
    }
}
