import { LightningElement, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const FIELDS = ['WorkOrder.Subject', 'WorkOrder.Status'];
export default class OfflineTechApp extends LightningElement {
  @api recordId;
  draftNotes = ''; queue = []; conflict = false; serverNotes = ''; isOffline = false;
  get queueCount() { return this.queue.length; }
  connectedCallback() {
    this.isOffline = !navigator.onLine;
    window.addEventListener('online', this.goOnline);
    window.addEventListener('offline', this.goOffline);
    try { this.queue = JSON.parse(localStorage.getItem('techDrafts') || '[]'); } catch { this.queue = []; }
    if (this.recordId) getRecord({ recordId: this.recordId, fields: FIELDS }).catch(() => {});
  }
  disconnectedCallback() { window.removeEventListener('online', this.goOnline); window.removeEventListener('offline', this.goOffline); }
  goOnline = () => { this.isOffline = false; this.syncNow(); };
  goOffline = () => { this.isOffline = true; };
  handleNotes(e) { this.draftNotes = e.target.value; }
  handlePhoto(e) { this.photoName = e.target.files?.[0]?.name || ''; }
  saveDraft() {
    this.queue = [...this.queue, { recordId: this.recordId, notes: this.draftNotes, ts: Date.now() }];
    localStorage.setItem('techDrafts', JSON.stringify(this.queue));
    this.dispatchEvent(new ShowToastEvent({ title: 'Draft saved', message: `${this.queue.length} queued`, variant: 'success' }));
  }
  async syncNow() {
    if (!this.queue.length) return;
    // Conflict simulation: if serverNotes differs, flag conflict
    if (this.serverNotes && this.serverNotes !== this.draftNotes) { this.conflict = true; return; }
    this.queue = []; localStorage.setItem('techDrafts', '[]');
    this.dispatchEvent(new ShowToastEvent({ title: 'Synced', message: 'Drafts uploaded', variant: 'success' }));
  }
  keepMine() { this.conflict = false; this.queue = []; localStorage.setItem('techDrafts', '[]'); }
  takeServer() { this.conflict = false; this.draftNotes = this.serverNotes; this.queue = []; localStorage.setItem('techDrafts', '[]'); }
}
