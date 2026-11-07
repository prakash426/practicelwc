import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class LeadToCash extends NavigationMixin(LightningElement) {
  @track stage = 'worklist';
  @track oppId;
  handleConverted(e) { this.oppId = e.detail; this.stage = 'quote'; }
  launchApproval() {
    this[NavigationMixin.Navigate]({ type: 'standard__flow', attributes: { flowApiName: 'Quote_Approval' }, state: { flow__oppId: this.oppId } });
  }
}
