import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import convertLead from '@salesforce/apex/LeadConvertService.convertLead';

export default class LeadConvertForm extends NavigationMixin(LightningElement) {
  @api recordId;
  isBusy = false;
  error;

  @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, COMPANY_FIELD] })
  lead;

  get leadName() {
    return this.lead?.data ? getFieldValue(this.lead.data, NAME_FIELD) : undefined;
  }
  get company() {
    return this.lead?.data ? getFieldValue(this.lead.data, COMPANY_FIELD) : undefined;
  }
  get hasError() {
    return !!this.error;
  }

  async handleConvert() {
    this.isBusy = true;
    this.error = undefined;
    try {
      const result = await convertLead({ leadId: this.recordId });
      this.dispatchEvent(
        new ShowToastEvent({ title: 'Lead converted', message: this.leadName ?? '', variant: 'success' })
      );
      this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: { recordId: result.accountId, actionName: 'view' }
      });
    } catch (e) {
      this.error = e;
    } finally {
      this.isBusy = false;
    }
  }
}
