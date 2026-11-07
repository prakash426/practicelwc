import { LightningElement, api } from 'lwc';

export default class RecordHeaderWidgets extends LightningElement {
  /** Card heading shown in App Builder. */
  @api cardTitle = 'At a Glance';
  /** ISO date string for the SLA deadline, e.g. 2026-12-01. */
  @api slaDeadline;
  /** Health score 0-100. Leave blank for the no-data illustration. */
  @api healthScore;
  /** Show the SLA countdown widget. */
  @api showSla = true;
  /** Show the health score widget. */
  @api showHealth = true;

  get hasHealth() {
    return this.healthScore !== undefined && this.healthScore !== null && this.healthScore !== '';
  }

  get healthWord() {
    if (!this.hasHealth) return '';
    const s = Number(this.healthScore);
    if (s >= 80) return 'Healthy';
    if (s >= 50) return 'Watch';
    return 'At risk';
  }

  get slaText() {
    if (!this.slaDeadline) return '';
    const ms = new Date(this.slaDeadline).getTime() - Date.now();
    if (Number.isNaN(ms)) return '';
    if (ms < 0) return 'Overdue';
    const hours = Math.floor(ms / 3600000);
    if (hours < 24) return `${hours}h left`;
    return `${Math.floor(hours / 24)}d left`;
  }

  get slaClass() {
    const t = this.slaText;
    if (t === 'Overdue') return 'value overdue';
    return 'value';
  }
}
