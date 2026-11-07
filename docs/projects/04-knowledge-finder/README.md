# 04 Knowledge Self-Help Finder (`knowledgeFinder`)
Scenario: B2. A customer types a question, reads articles, escalates only if stuck.
Setup: deploy bundle + `KnowledgeSearchController.cls` + `SearchTerm` message channel; needs Knowledge enabled with online articles.
Learning goals: debounced `@wire` refresh via `c/utilsLib`, `lightning-accordion`, LMS publish, `lwc:on` event-map handlers.
Acceptance: debounce fires once per pause; LMS term reaches case composer; Jest covers debounce + empty results.
