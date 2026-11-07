import { LightningElement, api } from 'lwc';

// LWC local flow action (lightning__FlowAction): client-side discount math.
// Inputs/outputs below form the action contract tested in Jest.
export default class DiscountFlowAction extends LightningElement {
    @api amount = 0;
    @api discountPercent = 0;
    @api total = 0;

    compute() {
        const amt = Number(this.amount) || 0;
        const pct = Math.min(100, Math.max(0, Number(this.discountPercent) || 0));
        this.total = Math.round(amt * (1 - pct / 100) * 100) / 100;
        return this.total;
    }

    handleAmount(e) { this.amount = e.target.value; this.compute(); }
    handleDiscount(e) { this.discountPercent = e.target.value; this.compute(); }

    @api invoke() {
        // Flow runtime calls invoke() for auto-layout actions.
        return { total: this.compute() };
    }
}
