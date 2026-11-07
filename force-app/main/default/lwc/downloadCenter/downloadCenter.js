import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getProjects from '@salesforce/apex/ProjectController.getProjects';
import { downloadCsv, formatCurrency } from 'c/utilsLib';

const COLUMNS = [
  { label: 'Name', fieldName: 'Name', type: 'text' },
  { label: 'Status', fieldName: 'Status__c', type: 'text' },
  { label: 'Budget', fieldName: 'Budget__c', type: 'currency' }
];

export default class DownloadCenter extends LightningElement {
  columns = COLUMNS;
  projects;
  error;

  @wire(getProjects)
  wired(result) {
    this.projects = result.data;
    this.error = result.error;
  }

  get hasRows() {
    return !!(this.projects && this.projects.length);
  }
  get hasError() {
    return !!this.error;
  }
  get isLoaded() {
    return this.projects !== undefined || this.error !== undefined;
  }
  get exportDisabled() {
    return !this.hasRows;
  }

  handleExport() {
    if (!this.hasRows) return;
    const rows = this.projects.map((p) => ({
      Name: p.Name,
      Status__c: p.Status__c,
      Budget__c: p.Budget__c ?? ''
    }));
    // LWS-clean: Blob + object URL. data: URIs fail silently at v67.
    downloadCsv(rows, COLUMNS, 'projects.csv');
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Export started',
        message: `${rows.length} project(s) exported.`,
        variant: 'success'
      })
    );
  }

  get totalBudget() {
    return formatCurrency((this.projects ?? []).reduce((s, p) => s + (p.Budget__c ?? 0), 0));
  }
}
