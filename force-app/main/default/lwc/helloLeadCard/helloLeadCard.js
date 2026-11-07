import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';

const FIELDS = [NAME_FIELD, COMPANY_FIELD];

export default class HelloLeadCard extends LightningElement {
  @api recordId;

  @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
  lead;

  get leadName() {
    return this.lead?.data ? getFieldValue(this.lead.data, NAME_FIELD) : undefined;
  }

  get company() {
    return this.lead?.data ? getFieldValue(this.lead.data, COMPANY_FIELD) : undefined;
  }

  get hasLead() {
    return !!this.lead?.data && !!this.leadName;
  }

  get hasError() {
    return !!this.lead?.error;
  }

  // Nullish default (complex-expression-safe getter pattern).
  get greeting() {
    return `Hello, ${this.leadName ?? 'there'}!`;
  }

  get companyLine() {
    return this.company ? `from ${this.company}` : 'Company unknown';
  }
}
