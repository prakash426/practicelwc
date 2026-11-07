import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';
import getPendingRequests from '@salesforce/apex/ApprovalService.getPendingRequests';
import updateComments from '@salesforce/apex/ApprovalService.updateComments';

const ACTIONS = [
    { label: 'Approve', name: 'approve' },
    { label: 'Reject', name: 'reject' }
];
const COLUMNS = [
    { label: 'Request', fieldName: 'Name' },
    { label: 'Opportunity', fieldName: 'oppName' },
    { label: 'Discount %', fieldName: 'Requested_Discount__c', type: 'percent', typeAttributes: { maximumFractionDigits: 1 } },
    { label: 'Comments', fieldName: 'Comments__c', editable: true },
    { label: 'Status', fieldName: 'Status__c' },
    { type: 'action', typeAttributes: { rowActions: ACTIONS } }
];

export default class ApprovalInbox extends LightningElement {
    columns = COLUMNS;
    requests = [];
    draftValues = [];
    error;
    isLoading = true;
    modalOpen = false;
    selectedId;
    selectedAction;
    wiredResult;
    subscription;

    @wire(getPendingRequests)
    wiredRequests(result) {
        this.wiredResult = result;
        this.isLoading = false;
        if (result.data) {
            this.error = undefined;
            this.requests = result.data.map((r) => ({ ...r, oppName: r.Opportunity__r?.Name || '' }));
        } else if (result.error) {
            this.error = result.error;
        }
    }

    connectedCallback() {
        onError((err) => {
            // eslint-disable-next-line no-console
            console.error('empApi error', JSON.stringify(err));
        });
        subscribe('/event/Approval_Request_Event__e', -1, () => this.handleRefresh()).then((sub) => {
            this.subscription = sub;
        });
    }

    disconnectedCallback() {
        if (this.subscription) unsubscribe(this.subscription);
    }

    get hasRows() { return this.requests && this.requests.length > 0; }
    get errorMessage() {
        if (!this.error) return '';
        return this.error.body?.message || this.error.message || 'Unknown error';
    }

    handleRefresh() {
        this.isLoading = true;
        return refreshApex(this.wiredResult).finally(() => { this.isLoading = false; });
    }

    async handleInlineSave(event) {
        const drafts = event.detail.draftValues;
        try {
            await updateComments({ updates: drafts.map((d) => ({ Id: d.Id, Comments__c: d.Comments__c })) });
            this.draftValues = [];
            this.dispatchEvent(new ShowToastEvent({ title: 'Saved', message: 'Comments updated.', variant: 'success' }));
            await this.handleRefresh();
        } catch (e) {
            this.dispatchEvent(new ShowToastEvent({ title: 'Save failed', message: e.body?.message || 'Inline save failed.', variant: 'error' }));
        }
    }

    handleRowAction(event) {
        this.selectedId = event.detail.row.Id;
        this.selectedAction = event.detail.action.name;
        this.modalOpen = true;
    }

    handleModalClose() { this.modalOpen = false; }
    async handleDecided(event) {
        this.modalOpen = false;
        this.dispatchEvent(new ShowToastEvent({
            title: event.detail.approved ? 'Approved' : 'Rejected',
            message: `Request ${event.detail.recordId} decided.`,
            variant: event.detail.approved ? 'success' : 'warning'
        }));
        await this.handleRefresh();
    }
}
