import { LightningElement, api } from 'lwc';
export default class CpqLineEditor extends LightningElement {
  @api lines = [];
  emit() { this.dispatchEvent(new CustomEvent('lineschange', { detail: { lines: this.lines } })); }
  handleQty(e) { const id = e.target.dataset.id; this.lines = this.lines.map(l => l.id === id ? { ...l, qty: Number(e.target.value) } : l); this.emit(); }
  handleDisc(e) { const id = e.target.dataset.id; this.lines = this.lines.map(l => l.id === id ? { ...l, discount: Number(e.target.value) } : l); this.emit(); }
}
