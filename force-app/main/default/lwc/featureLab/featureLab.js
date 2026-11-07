import { LightningElement, wire, track } from 'lwc';
import getFlags from '@salesforce/apex/FeatureFlagService.getFlags';
export default class FeatureLab extends LightningElement {
  @track flags = {};
  channel = 'preview';
  @wire(getFlags, { channel: '$channel' }) wired({ data }) { if (data) this.flags = data; }
  get betaOn() { return !!this.flags.complexExprBeta; }
}
