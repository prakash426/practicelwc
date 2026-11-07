import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SEARCH_TERM from '@salesforce/messageChannel/SearchTerm__c';

export default class CaseCreator extends NavigationMixin(LightningElement) {
  subject = '';
  description = '';
  priority = 'Medium';
  prefilledTerm = '';
  createdId;
  error;
  isBusy = false;
  subscription;

  priorityOptions = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ];

  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    this.subscription = subscribe(this.messageContext, SEARCH_TERM, (message) => {
      if (message?.term && !this.createdId) {
        this.prefilledTerm = message.term;
        if (!this.subject) this.subject = `Help with: ${message.term}`;
        if (!this.description) this.description = `I searched for "${message.term}" but still need help.`;
      }
    });
  }

  disconnectedCallback() {
    unsubscribe(this.subscription);
    this.subscription = undefined;
  }

  handleSubject(e) { this.subject = e.target.value; }
  handleDescription(e) { this.description = e.target.value; }
  handlePriority(e) { this.priority = e.target.value; }

  async handleSubmit() {
    if (!this.subject) return;
    this.isBusy = true;
    this.error = undefined;
    try {
      const rec = await createRecord({
        apiName: 'Case',
        fields: { Subject: this.subject, Description: this.description, Priority: this.priority, Origin: 'Web' }
      });
      this.createdId = rec.id;
      this.dispatchEvent(new ShowToastEvent({ title: 'Case created', variant: 'success' }));
    } catch (e) {
      this.error = e;
    } finally {
      this.isBusy = false;
    }
  }

  handleUploadFinished(event) {
    const count = event.detail.files.length;
    this.dispatchEvent(
      new ShowToastEvent({ title: 'Upload complete', message: `${count} file(s) attached`, variant: 'success' })
    );
  }

  handleOpen() {
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: { recordId: this.createdId, actionName: 'view' }
    });
  }
}
