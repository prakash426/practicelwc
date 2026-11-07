import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';

export default class FlowHandoff extends NavigationMixin(LightningElement) {
    @api recordId;
    @api flowApiName = 'Quote_Approval_Flow';
    @api discountPercent = 10;
    error = '';
    opp;

    @wire(getRecord, { recordId: '$recordId', fields: [AMOUNT_FIELD] })
    wiredOpp({ data, error }) {
        if (data) this.opp = data;
        else if (error) this.error = error.body?.message || 'Could not load opportunity.';
    }

    get amount() { return this.opp ? getFieldValue(this.opp, AMOUNT_FIELD) || 0 : 0; }
    get previewTotal() {
        const total = this.amount * (1 - (this.discountPercent || 0) / 100);
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
    }

    handleSaved() {
        this.dispatchEvent(new ShowToastEvent({ title: 'Saved', message: 'Quote fields saved.', variant: 'success' }));
    }

    handleFormError(event) {
        this.error = event.detail?.message || 'Save failed.';
    }

    handleLaunchFlow() {
        // Nav-to-flow one-liner: standard__flow + flow__-prefixed state.
        this[NavigationMixin.Navigate]({
            type: 'standard__flow',
            attributes: { flowApiName: this.flowApiName },
            state: { flow__recordId: this.recordId, flow__discountPercent: String(this.discountPercent) }
        });
    }
}
