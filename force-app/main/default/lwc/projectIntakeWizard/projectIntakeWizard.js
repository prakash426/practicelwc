import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { formatCurrency } from 'c/utilsLib';

export default class ProjectIntakeWizard extends NavigationMixin(LightningElement) {
  step = '1';
  name = '';
  status = 'New';
  budget;
  createdId;
  error;
  isBusy = false;

  statusOptions = [
    { label: 'New', value: 'New' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Blocked', value: 'Blocked' }
  ];

  get isStep1() { return this.step === '1'; }
  get isStep2() { return this.step === '2'; }
  get isStep3() { return this.step === '3'; }
  get canGoBack() { return this.step !== '1' && !this.createdId; }
  get canGoNext() { return this.step !== '3'; }
  get budgetDisplay() {
    return this.budget ? formatCurrency(this.budget) : 'Not set';
  }

  handleName(e) { this.name = e.target.value; }
  handleStatus(e) { this.status = e.target.value; }
  handleBudget(e) { this.budget = e.target.value === '' ? undefined : Number(e.target.value); }

  validateStep() {
    const inputs = [...this.template.querySelectorAll('lightning-input, lightning-combobox')];
    let valid = true;
    inputs.forEach((i) => {
      if (typeof i.reportValidity === 'function' && !i.reportValidity()) valid = false;
    });
    if (this.isStep1 && !this.name.trim()) valid = false;
    if (this.isStep2 && this.budget !== undefined && this.budget < 0) valid = false;
    return valid;
  }

  handleBack() {
    this.step = String(Number(this.step) - 1);
  }

  handleNext() {
    if (!this.validateStep()) return;
    this.step = String(Number(this.step) + 1);
  }

  async handleSubmit() {
    if (!this.validateStep()) return;
    this.isBusy = true;
    this.error = undefined;
    try {
      const rec = await createRecord({
        apiName: 'Project__c',
        fields: { Name: this.name.trim(), Status__c: this.status, Budget__c: this.budget }
      });
      this.createdId = rec.id;
      this.dispatchEvent(new ShowToastEvent({ title: 'Project created', variant: 'success' }));
    } catch (e) {
      this.error = e;
    } finally {
      this.isBusy = false;
    }
  }

  handleUploadFinished(event) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Files attached',
        message: `${event.detail.files.length} file(s)`,
        variant: 'success'
      })
    );
  }

  handleOpen() {
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: { recordId: this.createdId, actionName: 'view' }
    });
  }
}
