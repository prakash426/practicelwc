import { LightningElement, track, wire } from 'lwc';
import getQueue from '@salesforce/apex/RoutingService.getQueue';
import routeCase from '@salesforce/apex/RoutingService.routeCase';
export default class OmnichannelHub extends LightningElement {
  @track queue = []; @track stats = { bot: 0, console: 0, portal: 0 };
  channel = '/event/Routing_Event__e';
  @wire(getQueue) wired({ data }) { if (data) { this.queue = data; this.computeStats(data); } }
  computeStats(rows) {
    const s = { bot: 0, console: 0, portal: 0 };
    for (const r of rows) { if (s[r.Origin] !== undefined) s[r.Origin]++; }
    this.stats = s;
  }
  handleEvent(event) {
    const payload = event.detail?.payload;
    if (payload?.CaseId__c) this.refresh();
  }
  async refresh() { this.queue = await getQueue(); this.computeStats(this.queue); }
  async handleRoute(event) {
    await routeCase({ caseId: event.target.dataset.id, skill: 'General' });
    await this.refresh();
  }
  columns = [{ label: 'Subject', fieldName: 'Subject' }, { label: 'Origin', fieldName: 'Origin' }, { label: 'Status', fieldName: 'Status' }];
}
