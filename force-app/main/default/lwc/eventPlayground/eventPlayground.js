import { LightningElement, api, wire } from 'lwc';
import { getRecords } from 'lightning/uiRecordApi';

const SAMPLE = [
  { id: 's1', name: 'Lobby Refit', status: 'New', note: 'Click to preview.' },
  { id: 's2', name: 'Warehouse Rack', status: 'In Progress', note: 'Click to preview.' }
];

export default class EventPlayground extends LightningElement {
  /** Optional record ids to hydrate via LDS; falls back to sample rows. */
  @api recordIds = [];
  editMode = false;
  lastAction = 'none';
  drafts = {};

  @wire(getRecords, { records: '$wiredRecordConfigs' })
  wiredRecords;

  get wiredRecordConfigs() {
    if (!this.recordIds?.length) return undefined;
    return this.recordIds.map((id) => ({
      recordIds: [id],
      fields: ['Project__c.Name', 'Project__c.Status__c']
    }));
  }

  get rows() {
    const results = this.wiredRecords?.data?.results;
    if (results?.length) {
      return results.map((r, i) => ({
        id: this.recordIds[i],
        name: r.result.fields.Name?.value ?? 'Unnamed',
        status: r.result.fields.Status__c?.value ?? 'New',
        note: 'Loaded via getRecords.',
        draft: this.drafts[this.recordIds[i]] ?? ''
      }));
    }
    return SAMPLE.map((r) => ({ ...r, draft: this.drafts[r.id] ?? '' }));
  }

  get hasRows() {
    return this.rows.length > 0;
  }
  get modeLabel() {
    return this.editMode ? 'Switch to Preview' : 'Switch to Edit';
  }

  // Two handler maps; the template binds whichever is active. No duplicated markup.
  viewHandlers = { click: (e) => this.previewRow(e) };
  editHandlers = { click: (e) => this.focusRow(e) };
  get activeHandlers() {
    return this.editMode ? this.editHandlers : this.viewHandlers;
  }

  toggleMode() {
    this.editMode = !this.editMode;
    this.lastAction = this.editMode ? 'entered edit mode' : 'entered preview mode';
  }

  rowIdFromEvent(event) {
    return event.target?.closest?.('[data-id]')?.dataset?.id ?? 'unknown';
  }

  previewRow(event) {
    this.lastAction = `previewed ${this.rowIdFromEvent(event)}`;
  }

  focusRow(event) {
    this.lastAction = `editing ${this.rowIdFromEvent(event)}`;
  }

  handleDraftInput(event) {
    this.drafts = { ...this.drafts, [event.target.dataset.id]: event.target.value };
  }
}
