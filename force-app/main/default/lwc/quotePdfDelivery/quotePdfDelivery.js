import { LightningElement, api } from 'lwc';
import generatePdf from '@salesforce/apex/QuotePdfService.generatePdf';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class QuotePdfDelivery extends NavigationMixin(LightningElement) {
  @api recordId;
  generating = false; previewUrl = '';
  async handleGenerate() {
    this.generating = true;
    try {
      const base64 = await generatePdf({ quoteId: this.recordId });
      const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const blob = new Blob([bytes], { type: 'application/pdf' });
      this.previewUrl = URL.createObjectURL(blob);
      this.dispatchEvent(new ShowToastEvent({ title: 'PDF ready', message: 'Attached and emailed.', variant: 'success' }));
      this[NavigationMixin.Navigate]({ type: 'standard__flow', attributes: { flowApiName: 'Quote_Delivery_Status' }, state: { flow__quoteId: this.recordId } });
    } catch (e) {
      this.dispatchEvent(new ShowToastEvent({ title: 'Failed', message: e?.body?.message || 'error', variant: 'error' }));
    } finally { this.generating = false; }
  }
}
