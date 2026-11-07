// SSR-safe: light DOM, no window/document access, no renderedCallback server logic.
import { LightningElement, api, wire } from 'lwc';
import getProducts from '@salesforce/apex/CatalogService.getProducts';
export default class SsrProductCatalog extends LightningElement {
  static renderMode = 'light';
  @api category = 'All';
  products = [];
  get empty() { return this.products.length === 0; }
  @wire(getProducts, { category: '$category' })
  wired({ data }) { if (data) this.products = data; }
}
