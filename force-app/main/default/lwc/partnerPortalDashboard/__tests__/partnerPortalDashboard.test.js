import { createElement } from 'lwc';
import PartnerPortalDashboard from 'c/partnerPortalDashboard';
import getMyCases from '@salesforce/apex/PortalService.getMyCases';

jest.mock('@salesforce/apex/PortalService.getMyCases', () => ({ default: jest.fn() }), { virtual: true });
jest.mock('@salesforce/apex/PortalService.getCaseFiles', () => ({ default: jest.fn(() => Promise.resolve([])) }), { virtual: true });

const CASES = [{ Id: '5001', CaseNumber: '0001', Subject: 'Leak', Status: 'New' }];

describe('c-partner-portal-dashboard', () => {
    afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });

    it('renders partner cases table', async () => {
        getMyCases.mockResolvedValue(CASES);
        const el = createElement('c-partner-portal-dashboard', { is: PartnerPortalDashboard });
        document.body.appendChild(el);
        await Promise.resolve();
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('lightning-datatable')).not.toBeNull();
        expect(el.showCases).toBe(true);
    });

    it('shows error alert on wire failure', async () => {
        getMyCases.mockRejectedValue({ body: { message: 'no sharing access' } });
        const el = createElement('c-partner-portal-dashboard', { is: PartnerPortalDashboard });
        document.body.appendChild(el);
        await Promise.resolve();
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('[role="alert"]').textContent).toContain('no sharing access');
    });
});
