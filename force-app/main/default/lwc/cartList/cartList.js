import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCartLines from '@salesforce/apex/CartService.getCartLines';
import { getCartState, subscribeCart, setCartLines, updateLineQty, removeLine } from 'c/stateStore';

const COLUMNS = [
    { label: 'Product', fieldName: 'ProductName' },
    { label: 'Qty', fieldName: 'Quantity', type: 'number', editable: true },
    { label: 'Unit Price', fieldName: 'UnitPrice', type: 'currency' },
    { label: 'Line Total', fieldName: 'LineTotal', type: 'currency' },
    { type: 'action', typeAttributes: { rowActions: [{ label: 'Remove', name: 'remove' }] } }
];

export default class CartList extends LightningElement {
    columns = COLUMNS;
    lines = [];
    draftValues = [];
    unsubscribe;

    @wire(getCartLines)
    wiredLines({ data, error }) {
        if (data) {
            setCartLines(data);
        } else if (error) {
            this.dispatchEvent(new ShowToastEvent({ title: 'Cart load failed', message: error.body?.message || 'Unknown error', variant: 'error' }));
        }
    }

    connectedCallback() {
        this.lines = getCartState().lines;
        this.unsubscribe = subscribeCart((s) => { this.lines = s.lines; });
    }

    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }

    get hasLines() { return this.lines.length > 0; }

    handleSave(event) {
        for (const d of event.detail.draftValues) {
            updateLineQty(d.Id, d.Quantity);
        }
        this.draftValues = [];
        this.dispatchEvent(new CustomEvent('cartupdate', { detail: { source: 'cartList' }, bubbles: true, composed: true }));
    }

    handleRowAction(event) {
        if (event.detail.action.name === 'remove') {
            removeLine(event.detail.row.Id);
            this.dispatchEvent(new CustomEvent('cartupdate', { detail: { source: 'cartList', removed: event.detail.row.Id }, bubbles: true, composed: true }));
        }
    }
}
