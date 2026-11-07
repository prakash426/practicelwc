import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NotificationCenter extends NavigationMixin(LightningElement) {
    items = [];
    selected;
    panelOpen = true;
    subscription;
    seq = 0;

    connectedCallback() {
        onError((err) => {
            // eslint-disable-next-line no-console
            console.error('empApi error', JSON.stringify(err));
        });
        subscribe('/event/Notification_Event__e', -1, (msg) => this.handlePlatformEvent(msg)).then((sub) => {
            this.subscription = sub;
        });
    }

    disconnectedCallback() {
        if (this.subscription) unsubscribe(this.subscription);
    }

    get hasItems() { return this.items.length > 0; }
    get unreadCount() { return this.items.filter((n) => !n.read).length; }
    get hasUnread() { return this.unreadCount > 0; }

    handlePlatformEvent(message) {
        const p = message?.data?.payload || {};
        this.pushNotification({
            title: p.Title__c || 'Update',
            body: p.Body__c || 'Something changed.',
            type: p.Type__c || 'info',
            targetId: p.TargetId__c || null
        });
    }

    pushNotification({ title, body, type, targetId }) {
        const id = `n${++this.seq}`;
        // lwc:on per-type handler maps: approvals open the record, info opens detail.
        const handlers =
            type === 'approval'
                ? { click: () => this.openTargetById(id) }
                : { click: () => this.openDetailById(id) };
        this.items = [
            { id, title, body, type, targetId, read: false, handlers,
              preview: (body || '').slice(0, 60), dotClass: type === 'approval' ? 'dot dot-approval' : 'dot dot-info' },
            ...this.items
        ];
        this.dispatchEvent(new ShowToastEvent({ title, message: body, variant: type === 'approval' ? 'warning' : 'info' }));
    }

    openDetailById(id) {
        this.selected = this.items.find((n) => n.id === id);
        this.markRead(id);
    }

    openTargetById(id) {
        const note = this.items.find((n) => n.id === id);
        this.markRead(id);
        if (note?.targetId) {
            this[NavigationMixin.Navigate]({ type: 'standard__recordPage', attributes: { recordId: note.targetId, actionName: 'view' } });
        } else {
            this.selected = note;
        }
    }

    markRead(id) {
        this.items = this.items.map((n) => (n.id === id ? { ...n, read: true } : n));
    }

    markAllRead() {
        this.items = this.items.map((n) => ({ ...n, read: true }));
    }

    togglePanel() { this.panelOpen = !this.panelOpen; }
    closeDetail() { this.selected = undefined; }

    openRecord() {
        if (this.selected?.targetId) {
            this[NavigationMixin.Navigate]({ type: 'standard__recordPage', attributes: { recordId: this.selected.targetId, actionName: 'view' } });
        }
    }
}
