import { LightningElement, api } from 'lwc';
import decideRequest from '@salesforce/apex/ApprovalService.decideRequest';

export default class ApprovalActionModal extends LightningElement {
    @api recordId;
    @api action = 'approve';
    comments = '';
    error;
    isLoading = false;

    get isReject() { return this.action === 'reject'; }
    get title() { return this.isReject ? 'Reject' : 'Approve'; }
    get errorMessage() { return this.error?.body?.message || this.error?.message || 'Unknown error'; }

    handleComments(e) { this.comments = e.target.value; }
    handleCancel() { this.dispatchEvent(new CustomEvent('close')); }

    async handleConfirm() {
        if (this.isReject && !this.comments.trim()) {
            this.template.querySelector('lightning-textarea').reportValidity();
            return;
        }
        this.isLoading = true;
        this.error = undefined;
        try {
            await decideRequest({ requestId: this.recordId, approved: !this.isReject, comments: this.comments });
            this.dispatchEvent(new CustomEvent('decided', { detail: { recordId: this.recordId, approved: !this.isReject } }));
        } catch (e) {
            this.error = e;
        } finally {
            this.isLoading = false;
        }
    }
}
