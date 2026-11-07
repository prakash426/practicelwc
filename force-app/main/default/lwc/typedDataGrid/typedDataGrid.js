// Compiled output of typedDataGrid.ts (tsc). Deploy this file; do not deploy .ts.
import { LightningElement, api } from 'lwc';
export default class TypedDataGrid extends LightningElement {
  objectApiName = 'Account';
  columns = [];
  rows = [];
  searchKey = '';
  handleSearch(event) {
    const target = event.target;
    this.searchKey = target.value ?? '';
    this.dispatchEvent(new CustomEvent('search', { detail: { key: this.searchKey } }));
  }
  get filteredRows() {
    const k = (this.searchKey ?? '').toLowerCase();
    if (!k) return this.rows;
    return this.rows.filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(k)));
  }
}
