# 01 Hello Lead Card (`helloLeadCard`)
Scenario: B1 web-to-lead. An SDR opens a friendly greeting card on a Lead record or Home page.
Setup: deploy the bundle, drop it on a Lead record page with a recordId, or on Home for the fallback state.
Learning goals: `@api recordId`, `getRecord` + `getFieldValue`, `lwc:if/elseif/else`, `lightning-illustration` fallback, nullish-default getters.
Acceptance: renders Lead name or illustration; Jest covers name + fallback.
