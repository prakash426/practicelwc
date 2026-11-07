import { createElement } from 'lwc';
import PortalToInsight from 'c/portalToInsight';
import getInsights from '@salesforce/apex/PortalInsightService.getInsights';
jest.mock('@salesforce/apex/PortalInsightService.getInsights', () => ({ default: jest.fn() }), { virtual: true });
describe('portalToInsight consent gate', () => {
  afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });
  it('shows tiles when consent granted', async () => {
    getInsights.mockResolvedValue([{ label: 'Volume', value: 42 }]);
    const el = createElement('c-portal-to-insight', { is: PortalToInsight });
    document.body.appendChild(el);
    await Promise.resolve();
    expect(getInsights).toHaveBeenCalled();
  });
  it('shows empty state when no consent', async () => {
    getInsights.mockResolvedValue([]);
    const el = createElement('c-portal-to-insight', { is: PortalToInsight });
    document.body.appendChild(el);
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('c-empty-state-wrap')).not.toBeNull();
  });
});
