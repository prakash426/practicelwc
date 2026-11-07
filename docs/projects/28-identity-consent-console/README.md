# 28. Multi-Brand Identity + Consent Console

Level: Architect. Time: 4h. API v67. Branch: `project/28-identity-consent-console`.
Covers batch themes: **admin toolkit** + **design-system showcase** (consent toggles, audit table).

Business scenario R1: privacy officer manages consent across brands at scale.
Persona: platform architect + privacy officer.

## Architecture
- LWC `identityConsentConsole`: brand picker, consent toggle matrix (per Contact x purpose), Shield event-log viewer.
- Writes via `executeMutation` (UI API) so consent changes work without custom Apex writes; reads/audit via Apex `ConsentService` (with sharing, user mode).
- Brand segregation enforced in Apex (brand filter on every query) + verified by sharing tests.
- CSP-safe: no inline scripts, SLDS styling hooks only.

```mermaid
sequenceDiagram
participant U as Privacy Officer
participant C as identityConsentConsole
participant G as executeMutation (UI API)
participant A as ConsentService (Apex)
participant DB as Consent__c / Identity_Event__c
U->>C: Toggle consent (brand B, Marketing)
C->>G: update Consent__c OptIn=false
G-->>C: {data, errors}
C->>A: logIdentityEvent(contactId, purpose, action)
A->>DB: insert Identity_Event__c (user mode)
A-->>C: audit id
C->>A: getConsents(brand)
A->>DB: SELECT ... WHERE Brand__c=:brand (user mode)
```

## Acceptance
- Consent change audits to Identity_Event__c.
- Brand B admin cannot see brand A data (Apex sharing tests).
- Jest covers toggle matrix (opt-in/out/error).
