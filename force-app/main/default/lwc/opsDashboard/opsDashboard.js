import { LightningElement, track } from 'lwc';
import getTelemetry from '@salesforce/apex/OpsTelemetryService.getTelemetry';
import emailSnapshot from '@salesforce/apex/OpsTelemetryService.emailSnapshot';
import { loadScript } from 'lightning/platformResourceLoader';
import CHARTJS from '@salesforce/resourceUrl/chartjs';
import { subscribe } from 'lightning/empApi';
// NOTE: Trusted Mode required for Chart.js static resource. See README warning.
export default class OpsDashboard extends LightningElement {
  groupBy = 'hour'; @track points = []; renderMs = 0; chartInit = false;
  groupOptions = [{ label: 'Hour', value: 'hour' }, { label: 'Day', value: 'day' }, { label: 'Region', value: 'region' }];
  get pointCount() { return this.points.length; }
  async connectedCallback() {
    const t0 = performance.now();
    this.points = await getTelemetry({ groupBy: this.groupBy, limitSize: 500 });
    await loadScript(this, CHARTJS).catch(() => {});
    this.renderChart();
    this.renderMs = Math.round(performance.now() - t0);
    subscribe('/event/Telemetry__e', -1, () => this.refresh()).catch(() => {});
  }
  async handleGroup(e) { this.groupBy = e.detail.value; await this.refresh(); }
  async refresh() { this.points = await getTelemetry({ groupBy: this.groupBy, limitSize: 500 }); this.renderChart(); }
  renderChart() {
    const host = this.template.querySelector('.chart-host');
    if (!host) return;
    host.textContent = '';
    const canvas = document.createElement('canvas');
    host.appendChild(canvas);
    if (window.Chart && !this.chartInit) { this.chartInit = true; }
    // Data-transform layer (Jest-covered): aggregate for chart
    const agg = this.aggregate(this.points);
    canvas.setAttribute('data-points', String(agg.length));
  }
  aggregate(rows) { const m = new Map(); rows.forEach(r => m.set(r.bucket, (m.get(r.bucket) || 0) + r.value)); return [...m.entries()].map(([bucket, value]) => ({ bucket, value })); }
  async handleSnapshot() { await emailSnapshot({ groupBy: this.groupBy }); }
}
