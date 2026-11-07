# 18. Notification Center (Custom Notifications)

Business scenario I1/I2: approvers and agents get live in-app notifications. An `empApi` subscription feeds a badge counter; `lwc:on` wires per-type click handlers (approvals deep-link to the record, info opens a modal detail).

- Bundle: `notificationCenter` (empApi live badge, lwc:on handler maps, modal detail, record deep-link, mark-all-read, toasts)
- Apex: `NotificationService.send` via `Messaging.CustomNotification` + test (2 validation tests; send path needs a CustomNotificationType in the org)
- Jest: badge increments on events, detail marks read, mark-all-read clears badge
- Concepts: lightning-emp-api, lwc:on dynamic handlers, custom notifications, NavigationMixin
- Branch: `project/18-notification-center`
