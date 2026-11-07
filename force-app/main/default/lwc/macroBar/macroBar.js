import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import runMacro from '@salesforce/apex/MacroService.runMacro';

export default class MacroBar extends LightningElement {
    @api recordId;
    isLoading = false;
    error;
    macros = [
        { name: 'first_response', label: 'Log First Response' },
        { name: 'escalate', label: 'Escalate to Tier 2' },
        { name: 'close_resolved', label: 'Close as Resolved' }
    ];

    get errorMessage() { return this.error?.body?.message || 'Unknown error'; }

    async handleRun(event) {
        const name = event.target.dataset.name;
        this.isLoading = true;
        this.error = undefined;
        try {
            const taskId = await runMacro({ caseId: this.recordId, macroName: name });
            const label = this.macros.find((m) => m.name === name)?.label || name;
            this.dispatchEvent(new ShowToastEvent({ title: 'Macro executed', message: `${label} logged.`, variant: 'success' }));
            this.dispatchEvent(new CustomEvent('macroexecuted', { detail: { label, taskId }, bubbles: true, composed: true }));
        } catch (e) {
            this.error = e;
            this.dispatchEvent(new ShowToastEvent({ title: 'Macro failed', message: this.errorMessage, variant: 'error' }));
        } finally {
            this.isLoading = false;
        }
    }
}
