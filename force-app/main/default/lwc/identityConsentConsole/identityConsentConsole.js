import { LightningElement, wire, track } from 'lwc';
import getConsents from '@salesforce/apex/ConsentService.getConsents';
import logIdentityEvent from '@salesforce/apex/ConsentService.logIdentityEvent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class IdentityConsentConsole extends LightningElement {
  @track brand = 'BrandA';
  @track consents = [];
  @track error;
  brands = [{ label: 'Brand A', value: 'BrandA' }, { label: 'Brand B', value: 'BrandB' }];
  @wire(getConsents, { brand: '$brand' })
  wired({ data, error }) {
    if (data) { this.consents = data.map(c => ({ ...c })); this.error = undefined; }
    else if (error) { this.error = error; this.consents = []; }
  }
  handleBrand(event) { this.brand = event.detail.value; }
  async handleToggle(event) {
    const { id, purpose } = event.target.dataset;
    const optIn = event.target.checked;
    try {
      await logIdentityEvent({ contactId: id, purpose, action: optIn ? 'OPT_IN' : 'OPT_OUT' });
      this.dispatchEvent(new ShowToastEvent({ title: 'Consent updated', variant: 'success' }));
    } catch (e) {
      this.dispatchEvent(new ShowToastEvent({ title: 'Update failed', message: e?.body?.message || 'Error', variant: 'error' }));
    }
  }
  get hasData() { return this.consents && this.consents.length > 0; }
}
