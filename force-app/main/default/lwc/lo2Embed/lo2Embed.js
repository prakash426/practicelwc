import { LightningElement, api } from 'lwc';
export default class Lo2Embed extends LightningElement {
  static renderMode = 'light';
  @api contactId;
  @api theme = 'default';
  get themeClass() { return `lo2-host lo2-${this.theme}`; }
}
