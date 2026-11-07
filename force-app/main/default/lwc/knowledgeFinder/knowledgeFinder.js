import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SEARCH_TERM from '@salesforce/messageChannel/SearchTerm__c';
import search from '@salesforce/apex/KnowledgeSearchController.search';
import { debounce } from 'c/utilsLib';

export default class KnowledgeFinder extends LightningElement {
  term = '';
  debouncedTerm = '';
  openSection;
  helpedCount = 0;

  @wire(MessageContext)
  messageContext;

  @wire(search, { term: '$debouncedTerm' })
  wiredHits;

  // lwc:on event map (GA v66 pattern): one map object instead of
  // parallel if:true handler chains.
  resultHandlers = {
    click: this.handleResultClick.bind(this)
  };

  debouncedSearch = debounce((value) => {
    this.debouncedTerm = value;
    if (value && value.length >= 2) {
      publish(this.messageContext, SEARCH_TERM, { term: value });
    }
  }, 300);

  handleTermChange(event) {
    this.term = event.target.value;
    this.debouncedSearch(this.term);
  }

  get hits() {
    return this.wiredHits?.data ?? [];
  }
  get hasHits() {
    return this.hits.length > 0;
  }
  get hasSearched() {
    return this.debouncedTerm.length >= 2 && this.wiredHits?.data !== undefined;
  }

  handleResultClick(event) {
    const action = event.target?.dataset?.action;
    if (action === 'helped') {
      this.helpedCount += 1;
    } else if (action === 'escalate') {
      publish(this.messageContext, SEARCH_TERM, { term: this.debouncedTerm });
    }
  }
}
