import { LightningElement, track, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CASE_THREAD from '@salesforce/messageChannel/caseThread__c';
import getThread from '@salesforce/apex/CapstoneServiceService.getThread';
export default class CaseToResolution extends LightningElement {
  @track events = [];
  @wire(MessageContext) ctx;
  connectedCallback() {
    subscribe(this.ctx, CASE_THREAD, (m) => { this.events = [...this.events, m]; });
  }
  async refresh() { this.events = await getThread(); }
}
