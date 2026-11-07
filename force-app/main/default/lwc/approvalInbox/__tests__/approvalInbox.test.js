import { createElement } from 'lwc';
import ApprovalInbox from 'c/approvalInbox';
import getPendingRequests from '@salesforce/apex/ApprovalService.getPendingRequests';

jest.mock('@salesforce/apex/ApprovalService.getPendingRequests', () => ({ default: jest.fn() }), { virtual: true });
jest.mock('lightning/empApi', () => ({ subscribe: jest.fn(() => Promise.resolve({})), unsubscribe: jest.fn(), onError: jest.fn() }), { virtual: true });

const ROWS = [{ Id: 'a00000000000001AAA', Name: 'AR-1', Requested_Discount__c: 12, Comments__c: '', Status__c: 'Pending', Opportunity__r: { Name: 'Acme' } }];

describe('c-approval-inbox', () => {
    afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });

    it('renders rows from wire', async () => {
        getPendingRequests.mockResolvedValue(ROWS);
        const el = createElement('c-approval-inbox', { is: ApprovalInbox });
        document.body.appendChild(el);
        await Promise.resolve();
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('lightning-datatable')).not.toBeNull();
    });

    it('shows empty state when queue is clear', async () => {
        getPendingRequests.mockResolvedValue([]);
        const el = createElement('c-approval-inbox', { is: ApprovalInbox });
        document.body.appendChild(el);
        await Promise.resolve();
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('.empty-state').textContent).toContain('Inbox zero');
    });

    it('shows error panel on wire failure', async () => {
        getPendingRequests.mockRejectedValue({ body: { message: 'denied' } });
        const el = createElement('c-approval-inbox', { is: ApprovalInbox });
        document.body.appendChild(el);
        await Promise.resolve();
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('[role="alert"]').textContent).toContain('denied');
    });
});
