import { createElement } from 'lwc';
import DiscountChecker from 'c/discountChecker';
import checkEligibility from '@salesforce/apex/DiscountService.checkEligibility';

jest.mock('@salesforce/apex/DiscountService.checkEligibility', () => ({ default: jest.fn() }), { virtual: true });

const ELIGIBLE = { eligible: true, maxDiscount: 15, rules: [{ name: 'Amount', detail: 'Above 10k', passed: true }] };
const BLOCKED = { eligible: false, maxDiscount: 0, rules: [{ name: 'Stage', detail: 'Closed stage', passed: false }] };

describe('c-discount-checker', () => {
    afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });

    async function mount() {
        const el = createElement('c-discount-checker', { is: DiscountChecker });
        el.recordId = '006000000000000AAA';
        document.body.appendChild(el);
        await Promise.resolve();
        return el;
    }

    it('renders eligible breakdown and fires custom event', async () => {
        checkEligibility.mockResolvedValue(ELIGIBLE);
        const el = await mount();
        const handler = jest.fn();
        el.addEventListener('eligibilitychecked', handler);
        el.shadowRoot.querySelector('lightning-button').click();
        await Promise.resolve();
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('[role="status"]').textContent).toBe('ELIGIBLE');
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ detail: { eligible: true, maxDiscount: 15 } }));
    });

    it('renders blocked state', async () => {
        checkEligibility.mockResolvedValue(BLOCKED);
        const el = await mount();
        el.shadowRoot.querySelector('lightning-button').click();
        await Promise.resolve();
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('[role="status"]').textContent).toBe('BLOCKED');
    });

    it('renders error panel with retry on Apex failure', async () => {
        checkEligibility.mockRejectedValue({ body: { message: 'boom' } });
        const el = await mount();
        el.shadowRoot.querySelector('lightning-button').click();
        await Promise.resolve();
        await Promise.resolve();
        expect(el.shadowRoot.querySelector('[role="alert"]').textContent).toContain('boom');
    });
});
