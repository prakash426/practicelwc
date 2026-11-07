# 14. Shared Cart State (State Management)

Business scenario I1/I3: the line-item list and the opportunity summary stay in sync. A `stateStore` module singleton is the single source of truth; edits in `cartList` propagate to `cartSummary` with zero server refetch, replacing event ping-pong. `cartApp` composes both and listens for `cartupdate` custom events.

- Bundles: `stateStore` (get/subscribe/set/update/remove/totals), `cartList` (wired Apex seed, inline qty edit, remove action), `cartSummary` (totals subscriber), `cartApp` (composition + custom event listener)
- Apex: `CartService.getCartLines` (cacheable, user mode) + test (2 tests)
- Jest: wire-to-state load, subscriber sync without refetch, `cartupdate` event
- Concepts: LWC State Management GA pattern, custom events, datatable inline edit, caching
- Branch: `project/14-shared-cart-state`
