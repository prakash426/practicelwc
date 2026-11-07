import { LightningElement, track, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import priceQuote from '@salesforce/apex/PricingEngine.priceQuote';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import QUOTE_OBJECT from '@salesforce/schema/Quote';
import PRICEBOOK_FIELD from '@salesforce/schema/Quote.Pricebook2Id';

export default class CpqLiteWizard extends LightningElement {
  currentStep = 'bundle';
  steps = ['bundle', 'configure', 'price', 'approve'];
  @track lines = [];
  @track pricedLines = [];
  total = 0; blockedMsg = ''; pricebookId = ''; currencyIso = 'USD';
  bundles = [
    { id: 'b1', name: 'Starter Tier', _children: [{ id: 'p1', name: 'Widget A', listPrice: 100 }, { id: 'p2', name: 'Widget B', listPrice: 200 }] },
    { id: 'b2', name: 'Pro Tier', _children: [{ id: 'p3', name: 'Widget C', listPrice: 500 }] }
  ];
  bundleColumns = [{ label: 'Bundle / Product', fieldName: 'name', type: 'text' }];
  priceColumns = [
    { label: 'Product', fieldName: 'name', type: 'text' },
    { label: 'Qty', fieldName: 'qty', type: 'number' },
    { label: 'Unit Price', fieldName: 'unitPrice', type: 'currency' },
    { label: 'Extended', fieldName: 'extended', type: 'currency' }
  ];
  pricebookOptions = []; currencyOptions = [{ label: 'USD', value: 'USD' }, { label: 'EUR', value: 'EUR' }, { label: 'INR', value: 'INR' }];
  @wire(getObjectInfo, { objectApiName: QUOTE_OBJECT }) quoteInfo;
  @wire(getPicklistValues, { recordTypeId: '$quoteInfo.data.defaultRecordTypeId', fieldApiName: PRICEBOOK_FIELD })
  wiredPB({ data }) { if (data?.values) this.pricebookOptions = data.values.map(v => ({ label: v.label, value: v.value })); }
  get isBundle() { return this.currentStep === 'bundle'; }
  get isConfigure() { return this.currentStep === 'configure'; }
  get isPrice() { return this.currentStep === 'price'; }
  get isApprove() { return this.currentStep === 'approve'; }
  get isFirst() { return this.currentStep === 'bundle'; }
  get isLast() { return this.currentStep === 'approve'; }
  get formattedTotal() { return new Intl.NumberFormat('en-US', { style: 'currency', currency: this.currencyIso }).format(this.total); }
  get approvalBlocked() { return !!this.blockedMsg; }
  handlePricebook(e) { this.pricebookId = e.detail.value; }
  handleCurrency(e) { this.currencyIso = e.detail.value; }
  handleBundleSelect(e) {
    const rows = e.detail.selectedRows.filter(r => r.listPrice);
    this.lines = rows.map(r => ({ id: r.id, name: r.name, qty: 1, listPrice: r.listPrice, discount: 0 }));
  }
  handleLinesChange(e) { this.lines = [...e.detail.lines]; }
  async goNext() {
    const i = this.steps.indexOf(this.currentStep);
    const next = this.steps[i + 1];
    if (next === 'price') await this.runPricing();
    if (next) this.currentStep = next;
  }
  goBack() { const i = this.steps.indexOf(this.currentStep); if (i > 0) this.currentStep = this.steps[i - 1]; }
  async runPricing() {
    try {
      const res = await priceQuote({ linesJson: JSON.stringify(this.lines) });
      this.pricedLines = res.lines; this.total = res.total;
      this.blockedMsg = res.requiresApproval ? 'Discount exceeds 20%: approval required before sending.' : '';
    } catch (err) {
      this.dispatchEvent(new ShowToastEvent({ title: 'Pricing failed', message: err?.body?.message || 'Unknown error', variant: 'error' }));
    }
  }
  handleApproval() {
    this.dispatchEvent(new ShowToastEvent({ title: 'Sent for approval', message: 'Advanced Approval flow launched.', variant: 'success' }));
  }
}
