import { LightningElement, api } from 'lwc';

export default class EmptyStateWrap extends LightningElement {
  @api heading = 'Nothing here yet';
  @api description = 'There is nothing to show right now.';
  @api illustrationName = 'empty:no_data';
}
