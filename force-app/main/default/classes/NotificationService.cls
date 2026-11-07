public with sharing class NotificationService {
    @AuraEnabled
    public static void sendNotification(String typeDeveloperName, String title, String body, Id targetId, Set<Id> userIds) {
        if (String.isBlank(typeDeveloperName)) throw new AuraHandledException('Notification type is required.');
        if (userIds == null || userIds.isEmpty()) throw new AuraHandledException('At least one recipient is required.');
        CustomNotificationType t = [
            SELECT Id FROM CustomNotificationType WHERE DeveloperName = :typeDeveloperName WITH USER_MODE LIMIT 1
        ];
        Messaging.CustomNotification n = new Messaging.CustomNotification();
        n.setNotificationTypeId(t.Id);
        n.setTitle(title);
        n.setBody(body);
        if (targetId != null) n.setTargetId(targetId);
        n.send(userIds);
    }
}
