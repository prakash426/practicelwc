# 16. Partner Portal Dashboard

Business scenario I3: a partner sees only their account's cases, proposals, and files. `with sharing` + `WITH USER_MODE` queries enforce sharing; the component offers breadcrumb nav, case list, record-view-form detail, file list with preview links, and a Flow launch button.

- Bundle: `partnerPortalDashboard` (Experience targets, breadcrumbs, datatable, record-view-form, imperative file fetch, flow nav)
- Apex: `PortalService` (sharing-safe cases + files) + test (3 tests incl. no-leakage check)
- Jest: cases table render, wire error alert
- Concepts: Experience Builder exposure, sharing-safe Apex, record forms, NavigationMixin
- Branch: `project/16-partner-portal-dashboard`
