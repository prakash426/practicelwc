# Batch D Manifest: Architect/Capstone Projects 28-35

Source: `/tmp/lwc-curriculum/curriculum.md` (502 lines, Level 4 spec lines 399-491).
Research refs: business-scenarios.md, latest-docs.md, similar-repos.md, repo-state.md (via prior results 1-4).

## Projects
| # | Dir | Curriculum title | LWC | Apex | Apex test | Jest |
|---|-----|------------------|-----|------|-----------|------|
| 28 | 28-identity-consent-console | Multi-Brand Identity + Consent Console | identityConsentConsole | ConsentService | ConsentServiceTest | YES |
| 29 | 29-offline-workbench | EX-Rated Offline Workbench | offlineWorkbench | CheckSyncService | CheckSyncServiceTest | - |
| 30 | 30-omnichannel-hub | Omnichannel Support Hub | omnichannelHub | RoutingService, RoutingRest | RoutingServiceTest | YES |
| 31 | 31-lightning-out-embed | LWC Beyond Salesforce (LO 2.0) | lo2Embed | Lo2TokenCheck | Lo2TokenCheckTest | - |
| 32 | 32-release-feature-lab | Release-Gated Feature Lab | featureLab | FeatureFlagService | FeatureFlagServiceTest | YES |
| 33 | 33-capstone-lead-to-cash | Capstone A: Lead-to-Cash | leadToCash | CapstoneSalesService | CapstoneSalesServiceTest | YES |
| 34 | 34-capstone-case-to-resolution | Capstone B: Case-to-Resolution | caseToResolution | CapstoneServiceService | CapstoneServiceServiceTest | - |
| 35 | 35-capstone-portal-to-insight | Capstone C: Portal-to-Insight | portalToInsight | PortalInsightService | PortalInsightServiceTest | YES |

Every project has per-project README.md with architecture notes + mermaid sequence diagram, Apex (with sharing, user mode) + Apex test. Jest in 5 projects (>= 2 required).

## Requested-theme coverage
| Requested bundle theme | Covered by |
|---|---|
| design-system showcase | 28 (toggle matrix, SLDS hooks), 32 (zero-JS accordions, HMR demo, runbook) |
| micro-frontend composition | 31 (LO2 declarative tag + host page), 35 (portal + LO2 slot) |
| integration (REST/Platform Events/CDC) | 30 (RoutingRest, Routing_Event__e via empApi, CDC note) |
| approval + Flow embedding | 33 (nav-to-flow approval, UTAM extension) |
| Experience Cloud portal widgets | 34 (finder embed, community target), 35 (Experience Builder composition, SSR front door) |
| analytics dashboard | 30 (per-channel tiles), 35 (telemetry tiles, Trusted-Mode boundary) |
| admin toolkit | 28 (consent admin console), 29 (threshold admin), 32 (release/error runbooks) |
| full end-to-end demo app | 33 (sales), 34 (service), 35 (platform) |

## Conventions
- API v67, `with sharing`, user-mode SOQL/DML, no WITH_SECURITY_ENFORCED, no data: URIs, no Aura, no .ts shipped.
- Writes only under /tmp/lwc-batch-D/; workspace untouched.
