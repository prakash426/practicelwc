import { createElement } from 'lwc';
import NotificationCenter from 'c/notificationCenter';

jest.mock('lightning/empApi', () => ({ subscribe: jest.fn(() => Promise.resolve({})), unsubscribe: jest.fn(), onError: jest.fn() }), { virtual: true });

describe('c-notification-center', () => {
    afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });

    function mount() {
        const el = createElement('c-notification-center', { is: NotificationCenter });
        document.body.appendChild(el);
        return el;
    }

    it('increments badge on platform event', async () => {
        const el = mount();
        await Promise.resolve();
        el.handlePlatformEvent({ data: { payload: { Title__c: 'Approval needed', Body__c: 'AR-1 awaits you', Type__c: 'approval', TargetId__c: 'a0001' } } });
        el.handlePlatformEvent({ data: { payload: { Title__c: 'FYI', Body__c: 'Sync done', Type__c: 'info' } } });
        await Promise.resolve();
        expect(el.unreadCount).toBe(2);
        expect(el.shadowRoot.querySelector('[role="status"]').textContent).toBe('2');
    });

    it('opening detail marks the item read', async () => {
        const el = mount();
        await Promise.resolve();
        el.pushNotification({ title: 'T', body: 'B', type: 'info', targetId: null });
        el.openDetailById('n1');
        await Promise.resolve();
        expect(el.unreadCount).toBe(0);
        expect(el.shadowRoot.querySelector('[role="dialog"]')).not.toBeNull();
    });

    it('markAllRead clears the badge', async () => {
        const el = mount();
        await Promise.resolve();
        el.pushNotification({ title: 'T', body: 'B', type: 'info', targetId: null });
        el.markAllRead();
        await Promise.resolve();
        expect(el.hasUnread).toBe(false);
    });
});
