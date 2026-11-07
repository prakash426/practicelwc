import { LightningElement, track } from 'lwc';
import syncReadings from '@salesforce/apex/CheckSyncService.syncReadings';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class OfflineWorkbench extends LightningElement {
  @track drafts = [];
  value; paramName = 'Vibration';
  threshold = 90;
  handleInput(e) { this[e.target.name] = e.target.value; }
  queueDraft() {
    const v = Number(this.value);
    this.drafts = [...this.drafts, { param: this.paramName, value: v, breach: v > Number(this.threshold), ts: Date.now() }];
    this.value = undefined;
  }
  async sync() {
    try {
      const res = await syncReadings({ payload: JSON.stringify(this.drafts) });
      this.drafts = [];
      this.dispatchEvent(new ShowToastEvent({ title: `Synced ${res} readings`, variant: 'success' }));
    } catch (e) {
      this.dispatchEvent(new ShowToastEvent({ title: 'Sync failed', message: e?.body?.message || 'Error', variant: 'error' }));
    }
  }
  get breachCount() { return this.drafts.filter(d => d.breach).length; }
}
