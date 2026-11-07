import { LightningElement, track, wire } from 'lwc';
import getInsights from '@salesforce/apex/PortalInsightService.getInsights';
export default class PortalToInsight extends LightningElement {
  @track insights = [];
  @track consentGranted = false;
  @wire(getInsights) wired({ data }) { if (data) { this.insights = data; this.consentGranted = data.length > 0; } }
  get tileCount() { return this.insights.length; }
}
