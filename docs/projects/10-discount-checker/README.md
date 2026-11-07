# 10. Discount Eligibility Checker

Business scenario I1: a sales rep checks discount eligibility before quoting. Imperative Apex evaluates three rules and returns a breakdown; the component renders eligible/blocked state, fires an `eligibilitychecked` custom event for parents, and shows toasts.

- Bundle: `discountChecker` (recordId, record-view-form header, imperative Apex, error panel with retry)
- Apex: `DiscountService.checkEligibility` (user mode, `with sharing`), `DiscountServiceTest` (5 tests)
- Jest: eligible + custom event, blocked, error/retry
- Concepts: imperative Apex, `{ data, errors }` handling, ShowToastEvent, custom events, error handling
- Branch: `project/10-discount-checker`
