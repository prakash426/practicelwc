import { createElement } from 'lwc';
import CartList from 'c/cartList';
import getCartLines from '@salesforce/apex/CartService.getCartLines';
import { getCartState, setCartLines, updateLineQty, cartTotals } from 'c/stateStore';

jest.mock('@salesforce/apex/CartService.getCartLines', () => ({ default: jest.fn() }), { virtual: true });

const LINES = [
    { Id: '00k1', ProductName: 'Widget', Quantity: 2, UnitPrice: 100, LineTotal: 200 },
    { Id: '00k2', ProductName: 'Gadget', Quantity: 1, UnitPrice: 50, LineTotal: 50 }
];

describe('c-cart-list + stateStore', () => {
    afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); setCartLines([]); });

    it('loads wire data into shared state', async () => {
        getCartLines.mockResolvedValue(LINES);
        const el = createElement('c-cart-list', { is: CartList });
        document.body.appendChild(el);
        await Promise.resolve();
        await Promise.resolve();
        expect(getCartState().lines.length).toBe(2);
        expect(cartTotals().totalAmount).toBe(250);
    });

    it('shared qty edit is visible to every subscriber without refetch', async () => {
        setCartLines(LINES);
        const seen = [];
        const { subscribeCart } = jest.requireActual('c/stateStore');
        const off = subscribeCart((s) => seen.push(s.lines.length));
        updateLineQty('00k1', 5);
        expect(cartTotals().totalAmount).toBe(550);
        expect(seen).toEqual([2]);
        off();
        expect(getCartLines).not.toHaveBeenCalled();
    });

    it('fires cartupdate custom event on inline save', async () => {
        getCartLines.mockResolvedValue(LINES);
        const el = createElement('c-cart-list', { is: CartList });
        document.body.appendChild(el);
        await Promise.resolve();
        await Promise.resolve();
        const handler = jest.fn();
        el.addEventListener('cartupdate', handler);
        el.handleSave({ detail: { draftValues: [{ Id: '00k1', Quantity: 3 }] } });
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ detail: { source: 'cartList' } }));
        expect(cartTotals().totalQty).toBe(4);
    });
});
