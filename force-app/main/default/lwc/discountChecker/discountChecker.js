import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import checkEligibility from '@salesforce/apex/DiscountService.checkEligibility';

export default class DiscountChecker extends LightningElement {
    @api recordId;
    result;
    error;
    isLoading = false;

    get errorMessage() {
        if (!this.error) return '';
        if (Array.isArray(this.error.body)) return this.error.body.map((e) => e.message).join('; ');
        return this.error.body?.message || this.error.message || 'Unknown error';
    }

    get badgeClass() {
        const base = 'slds-m-top_medium slds-badge slds-badge_inverse ';
        return base + (this.result?.eligible ? 'badge-eligible' : 'badge-blocked');
    }

    async handleCheck() {
        this.isLoading = true;
        this.error = undefined;
        this.result = undefined;
        try {
            const data = await checkEligibility({ opportunityId: this.recordId });
            this.result = {
                ...data,
                eligibleAsText: data.eligible ? 'ELIGIBLE' : 'BLOCKED',
                rules: (data.rules || []).map((r) => ({
                    ...r,
                    icon: r.passed ? 'action:approval' : 'action:close'
                }))
            };
            this.dispatchEvent(
                new ShowToastEvent({
                    title: data.eligible ? 'Eligible for discount' : 'Discount blocked',
                    message: data.eligible ? `Up to ${data.maxDiscount}% approved.` : 'See rule breakdown for reasons.',
                    variant: data.eligible ? 'success' : 'warning'
                })
            );
            this.dispatchEvent(
                new CustomEvent('eligibilitychecked', {
                    detail: { eligible: data.eligible, maxDiscount: data.maxDiscount },
                    bubbles: true,
                    composed: true
                })
            );
        } catch (e) {
            this.error = e;
            this.dispatchEvent(
                new ShowToastEvent({ title: 'Check failed', message: 'Could not evaluate eligibility.', variant: 'error' })
            );
        } finally {
            this.isLoading = false;
        }
    }
}
