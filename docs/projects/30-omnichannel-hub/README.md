# 30. Omnichannel Support Hub

Level: Architect. Time: 5h. API v67. Branch: `project/30-omnichannel-hub`.
Covers batch themes: **integration (REST/Platform Events/CDC)** + **analytics dashboard** (routing + volume tiles).

Business scenario R3: dynamic-sharing hub unifying bot, console, portal.
Persona: enterprise architect + agent.

## Architecture
- LWC `omnichannelHub`: channel tabs (bot/console/portal), routing queue (datatable), live event feed via `lightning-emp-api` (platform event `Routing_Event__e`), mini analytics tiles (volume by channel).
- Apex `RoutingService`: `routeCase` (queue assignment, user mode), `publishRoutingEvent` (EventBus), `@RestResource RoutingRest` for external bot posts.
- CDC on Case refreshes hub; LMS `hubChannel` syncs sibling console components.
- Dynamic sharing respected: queue query filters by running user's groups.

```mermaid
sequenceDiagram
participant B as Bot / External REST
participant R as RoutingRest / RoutingService
participant E as Routing_Event__e (PE)
participant H as omnichannelHub (empApi)
participant A as Agent console (LMS)
B->>R: POST /route {caseId, skill}
R->>R: routeCase (user mode, queue match)
R->>E: EventBus.publish
E-->>H: empApi notify
H->>H: refresh queue + analytics tiles
H->>A: LMS hubChannel {caseId, queue}
```
