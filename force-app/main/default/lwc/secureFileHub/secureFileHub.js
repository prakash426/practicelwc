import { LightningElement, api, wire } from 'lwc';
import listFiles from '@salesforce/apex/FileHubService.listFiles';
import downloadFile from '@salesforce/apex/FileHubService.downloadFile';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// LWS-hardened: no innerHTML, no data: URIs, no MutationObserver. Preview via textContent only.
export default class SecureFileHub extends LightningElement {
  @api recordId;
  files = []; wiredResult;
  cols = [
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { label: 'Preview', type: 'button', typeAttributes: { label: 'Preview', name: 'preview' } },
    { label: 'Download', type: 'button', typeAttributes: { label: 'Download', name: 'download' } }
  ];
  @wire(listFiles, { parentId: '$recordId' }) wired(p) { this.wiredResult = p; if (p.data) this.files = p.data; }
  sanitize(name) { return String(name || '').replace(/[<>&"']/g, ''); }
  async handleRow(e) {
    const row = e.detail.row;
    if (e.detail.action.name === 'preview') {
      const host = this.template.querySelector('.safe-preview');
      host.textContent = '';
      const p = document.createElement('p');
      p.textContent = this.sanitize(row.Title);
      host.appendChild(p);
    } else {
      const b64 = await downloadFile({ docId: row.Id });
      const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      const blob = new Blob([bytes], { type: 'application/octet-stream' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = this.sanitize(row.Title);
      a.click();
      URL.revokeObjectURL(a.href);
    }
  }
  async handleUpload() { await refreshApex(this.wiredResult); this.dispatchEvent(new ShowToastEvent({ title: 'Uploaded', message: 'File added.', variant: 'success' })); }
}
