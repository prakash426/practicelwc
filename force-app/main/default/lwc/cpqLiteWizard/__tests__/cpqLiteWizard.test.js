import { createElement } from 'lwc';
import CpqLiteWizard from 'c/cpqLiteWizard';
import priceQuote from '@salesforce/apex/PricingEngine.priceQuote';
jest.mock('@salesforce/apex/PricingEngine.priceQuote', () => ({ default: jest.fn() }), { virtual: true });
describe('cpqLiteWizard', () => {
  afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });
  test('blocks approval when discount requires it', async () => {
    priceQuote.mockResolvedValue({ lines: [{ id: 'p1', name: 'A', qty: 1, unitPrice: 80, extended: 80 }], total: 80, requiresApproval: true });
    const el = createElement('c-cpq-lite-wizard', { is: CpqLiteWizard });
    document.body.appendChild(el);
    await Promise.resolve();
    el.lines = [{ id: 'p1', name: 'A', qty: 1, listPrice: 100, discount: 25 }];
    await el.runPricing();
    expect(el.blockedMsg).toContain('approval required');
    expect(el.approvalBlocked).toBe(true);
  });
  test('totals priced lines', async () => {
    priceQuote.mockResolvedValue({ lines: [], total: 300, requiresApproval: false });
    const el = createElement('c-cpq-lite-wizard', { is: CpqLiteWizard });
    document.body.appendChild(el);
    await el.runPricing();
    expect(el.total).toBe(300);
    expect(el.blockedMsg).toBe('');
  });
});
