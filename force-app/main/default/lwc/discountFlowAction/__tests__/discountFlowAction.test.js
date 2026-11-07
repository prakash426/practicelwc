import { createElement } from 'lwc';
import DiscountFlowAction from 'c/discountFlowAction';

describe('c-discount-flow-action contract', () => {
    afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); });

    function mount(amount, discountPercent) {
        const el = createElement('c-discount-flow-action', { is: DiscountFlowAction });
        el.amount = amount;
        el.discountPercent = discountPercent;
        document.body.appendChild(el);
        return el;
    }

    it('computes total for valid inputs', () => {
        const el = mount(1000, 15);
        expect(el.invoke()).toEqual({ total: 850 });
    });

    it('clamps discount to 0-100', () => {
        expect(mount(1000, 150).invoke()).toEqual({ total: 0 });
        expect(mount(1000, -20).invoke()).toEqual({ total: 1000 });
    });

    it('treats non-numeric input as zero', () => {
        expect(mount('abc', 'xyz').invoke()).toEqual({ total: 0 });
    });
});
