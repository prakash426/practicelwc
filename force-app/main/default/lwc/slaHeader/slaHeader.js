import { LightningElement, api, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import AGENT_CHANNEL from '@salesforce/messageChannel/Agent_Message__c';

export default class SlaHeader extends LightningElement {
    @api recordId;
    remaining = '--:--';
    subscription;
    timer;

    @wire(MessageContext) messageContext;

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, AGENT_CHANNEL, (msg) => {
            if (msg.kind === 'case-selected' && msg.recordId) {
                this.recordId = msg.recordId;
                this.restart();
            }
        });
        this.restart();
    }

    disconnectedCallback() {
        if (this.subscription) unsubscribe(this.subscription);
        if (this.timer) clearInterval(this.timer);
    }

    restart() {
        if (this.timer) clearInterval(this.timer);
        let secs = 30 * 60;
        const tick = () => {
            secs = Math.max(0, secs - 1);
            const m = String(Math.floor(secs / 60)).padStart(2, '0');
            const s = String(secs % 60).padStart(2, '0');
            this.remaining = `${m}:${s}`;
        };
        tick();
        this.timer = setInterval(tick, 1000);
    }
}
