# 32. Release-Gated Feature Lab

Level: Architect. Time: 2h. API v67. Branch: `project/32-release-feature-lab`.
Covers batch themes: **design-system showcase** (SLDS patterns, zero-JS accordions, HMR demo).

Business scenario R3: team previews upcoming LWC features safely per channel.
Persona: release engineer.

## Architecture
- LWC `featureLab`: grouped `<details>` accordions (zero JS), Component Preview embed notes, HMR loop demo card, Error Console triage runbook section.
- Apex `FeatureFlagService`: returns channel-gated flags (user mode, custom metadata read).
- Release Manager Standard/preview channels: validate one Beta feature per preview scratch with rollback notes in README appendix.

```mermaid
sequenceDiagram
participant R as Release engineer
participant F as featureLab
participant A as FeatureFlagService
participant S as Preview scratch org
R->>F: Open lab (channel=preview)
F->>A: getFlags(channel)
A-->>F: {complexExprBeta: true, ...}
F->>S: HMR edit -> instant preview
S-->>F: grouped details render, no reload
R->>F: Seed non-fatal error -> Error Console runbook
```
