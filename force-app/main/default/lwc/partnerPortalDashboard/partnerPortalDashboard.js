import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import getMyCases from '@salesforce/apex/PortalService.getMyCases';
import getCaseFiles from '@salesforce/apex/PortalService.getCaseFiles';

const CASE_COLUMNS = [
    { label: 'Case', fieldName: 'CaseNumber' },
    { label: 'Subject', fieldName: 'Subject' },
    { label: 'Status', fieldName: 'Status' },
    { type: 'action', typeAttributes: { rowActions: [{ label: 'Open', name: 'open' }] } }
];

export default class PartnerPortalDashboard extends NavigationMixin(LightningElement) {
    caseColumns = CASE_COLUMNS;
    cases = [];
    files = [];
    error;
    isLoading = true;
    selectedCaseId;
    wiredCases;

    @wire(getMyCases)
    wired(result) {
        this.wiredCases = result;
        this.isLoading = false;
        if (result.data) {
            this.error = undefined;
            this.cases = result.data;
        } else if (result.error) {
            this.error = result.error;
        }
    }

    get showDetail() { return !!this.selectedCaseId; }
    get showCases() { return !this.selectedCaseId; }
    get viewLabel() { return this.showDetail ? 'Case Detail' : 'Overview'; }
    get hasFiles() { return this.files.length > 0; }
    get errorMessage() { return this.error?.body?.message || 'Unknown error'; }

    async handleCaseAction(event) {
        if (event.detail.action.name !== 'open') return;
        this.selectedCaseId = event.detail.row.Id;
        this.isLoading = true;
        try {
            const rows = await getCaseFiles({ caseId: this.selectedCaseId });
            this.files = (rows || []).map((f) => ({ ...f, url: `/lightning/r/ContentDocument/${f.Id}/view` }));
        } catch (e) {
            this.error = e;
        } finally {
            this.isLoading = false;
        }
    }

    handleBack() { this.selectedCaseId = undefined; this.files = []; refreshApex(this.wiredCases); }
    handleCrumbHome() { this.handleBack(); }
    handleCrumbCases() { this.handleBack(); }

    handleLaunchFlow() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: { url: '/flow/Partner_Proposal_Flow?recordId=' + (this.selectedCaseId || '') }
        });
    }
}
