import { LightningElement } from 'lwc';
import { subscribeCart, cartTotals } from 'c/stateStore';

export default class CartSummary extends LightningElement {
    totals = { lineCount: 0, totalQty: 0, totalAmount: 0 };
    unsubscribe;

    connectedCallback() {
        this.totals = cartTotals();
        this.unsubscribe = subscribeCart(() => { this.totals = cartTotals(); });
    }

    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }
}
