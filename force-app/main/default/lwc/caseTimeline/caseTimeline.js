import { LightningElement, api, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import { refreshApex } from '@salesforce/apex';
import AGENT_CHANNEL from '@salesforce/messageChannel/Agent_Message__c';
import getCaseTasks from '@salesforce/apex/MacroService.getCaseTasks';

export default class CaseTimeline extends LightningElement {
    @api recordId;
    items = [];
    error;
    wiredResult;
    subscription;

    @wire(MessageContext) messageContext;

    @wire(getCaseTasks, { caseId: '$recordId' })
    wiredTasks(result) {
        this.wiredResult = result;
        if (result.data) {
            this.error = undefined;
            this.items = result.data;
        } else if (result.error) {
            this.error = result.error;
        }
    }

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, AGENT_CHANNEL, (msg) => {
            if (msg.kind === 'macro-done') refreshApex(this.wiredResult);
            if (msg.kind === 'case-selected' && msg.recordId) this.recordId = msg.recordId;
        });
    }

    disconnectedCallback() {
        if (this.subscription) unsubscribe(this.subscription);
    }

    get hasItems() { return this.items.length > 0; }
    get errorMessage() { return this.error?.body?.message || 'Unknown error'; }
}
