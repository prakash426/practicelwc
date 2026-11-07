import { LightningElement } from 'lwc';

export default class CartApp extends LightningElement {
    lastUpdate = '';
    handleCartUpdate(event) {
        this.lastUpdate = event.detail.source || 'unknown';
    }
}
