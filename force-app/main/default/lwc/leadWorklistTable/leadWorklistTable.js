import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import getNewLeads from '@salesforce/apex/LeadController.getNewLeads';

const ACTIONS = [
  { label: 'View', name: 'view' },
  { label: 'New Task', name: 'newTask' }
];

const COLUMNS = [
  { label: 'Name', fieldName: 'Name', type: 'text' },
  { label: 'Company', fieldName: 'Company', type: 'text' },
  { label: 'Status', fieldName: 'Status', type: 'text' },
  { label: 'Email', fieldName: 'Email', type: 'email' },
  { type: 'action', typeAttributes: { rowActions: ACTIONS } }
];

export default class LeadWorklistTable extends NavigationMixin(LightningElement) {
  columns = COLUMNS;
  leads;
  error;
  wiredResult;

  @wire(getNewLeads)
  wiredLeads(result) {
    this.wiredResult = result;
    this.leads = result.data;
    this.error = result.error;
  }

  get hasRows() {
    return !!(this.leads && this.leads.length);
  }
  get hasError() {
    return !!this.error;
  }
  get isLoaded() {
    return this.leads !== undefined || this.error !== undefined;
  }

  handleRefresh() {
    return refreshApex(this.wiredResult);
  }

  async handleRowAction(event) {
    const { name } = event.detail.action;
    const row = event.detail.row;
    if (name === 'view') {
      this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: { recordId: row.Id, actionName: 'view' }
      });
    } else if (name === 'newTask') {
      try {
        await createRecord({
          apiName: 'Task',
          fields: { Subject: `Follow up with ${row.Name}`, WhoId: row.Id, Status: 'Not Started' }
        });
        this.dispatchEvent(
          new ShowToastEvent({ title: 'Task created', message: `Follow-up for ${row.Name}`, variant: 'success' })
        );
      } catch (e) {
        this.dispatchEvent(
          new ShowToastEvent({ title: 'Task failed', message: e?.body?.message ?? 'Unknown error', variant: 'error' })
        );
      }
    }
  }
}
