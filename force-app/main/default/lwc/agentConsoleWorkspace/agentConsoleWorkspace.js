import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import AGENT_CHANNEL from '@salesforce/messageChannel/Agent_Message__c';

export default class AgentConsoleWorkspace extends LightningElement {
    @api recordId;
    lastMacro = '';

    @wire(MessageContext) messageContext;

    handleRecordChange(event) {
        this.recordId = event.detail.recordId;
        publish(this.messageContext, AGENT_CHANNEL, { recordId: this.recordId, kind: 'case-selected', payload: '' });
    }

    handleMacro(event) {
        this.lastMacro = event.detail.label || 'macro';
        publish(this.messageContext, AGENT_CHANNEL, { recordId: this.recordId, kind: 'macro-done', payload: this.lastMacro });
    }
}
