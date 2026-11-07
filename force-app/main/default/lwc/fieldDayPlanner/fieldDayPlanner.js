import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe } from 'lightning/empApi';
import { refreshApex } from '@salesforce/apex';
import getDayPlan from '@salesforce/apex/SchedulingService.getDayPlan';
import reschedule from '@salesforce/apex/SchedulingService.reschedule';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class FieldDayPlanner extends LightningElement {
  @track appts = []; liveStatus = 'subscribed'; wiredResult; channel = '/event/Tech_Status__e'; sub;
  cols = [
    { label: 'Subject', fieldName: 'Subject', type: 'text' },
    { label: 'Status', fieldName: 'Status', type: 'text' },
    { label: 'Start', fieldName: 'SchedStartTime', type: 'date' },
    { type: 'action', typeAttributes: { rowActions: [{ label: 'Push +1h', name: 'push' }] } }
  ];
  get markers() { return this.appts.map(a => ({ location: { City: a.City, State: a.State }, title: a.Subject })); }
  @wire(getDayPlan) wired(p) { this.wiredResult = p; if (p.data) this.appts = p.data; }
  connectedCallback() {
    subscribe(this.channel, -1, (msg) => { this.liveStatus = JSON.stringify(msg?.data?.payload || {}); refreshApex(this.wiredResult); })
      .then(s => { this.sub = s; });
  }
  disconnectedCallback() { if (this.sub) unsubscribe(this.sub); }
  async handleRowAction(e) {
    if (e.detail.action.name !== 'push') return;
    try { await reschedule({ apptId: e.detail.row.Id, shiftHours: 1 }); await refreshApex(this.wiredResult); }
    catch (err) { this.dispatchEvent(new ShowToastEvent({ title: 'Reschedule failed', message: err?.body?.message || 'err', variant: 'error' })); }
  }
}
