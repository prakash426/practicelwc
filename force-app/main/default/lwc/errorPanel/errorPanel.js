import { LightningElement, api } from 'lwc';
import { reduceErrors } from 'c/utilsLib';

export default class ErrorPanel extends LightningElement {
  _errors;
  @api
  get errors() {
    return this._errors;
  }
  set errors(value) {
    this._errors = value;
    this.messages = reduceErrors(value);
  }
  messages = [];
  get hasErrors() {
    return this.messages.length > 0;
  }
}
