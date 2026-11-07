// Shared-state singleton (Summer 26 LWC State Management pattern): one module-level
// object imported by siblings so list + summary stay in sync with zero refetch.
const listeners = new Set();
const state = { lines: [], currencyCode: 'USD' };

function notify() {
    listeners.forEach((fn) => {
        try { fn({ ...state, lines: [...state.lines] }); } catch (e) { /* listener-local */ }
    });
}

export function getCartState() {
    return { ...state, lines: [...state.lines] };
}

export function subscribeCart(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

export function setCartLines(lines) {
    state.lines = (lines || []).map((l) => ({ ...l }));
    notify();
}

export function updateLineQty(lineId, qty) {
    const line = state.lines.find((l) => l.Id === lineId);
    if (line) {
        line.Quantity = qty;
        line.LineTotal = qty * (line.UnitPrice || 0);
        notify();
    }
}

export function removeLine(lineId) {
    state.lines = state.lines.filter((l) => l.Id !== lineId);
    notify();
}

export function cartTotals() {
    const qty = state.lines.reduce((s, l) => s + (l.Quantity || 0), 0);
    const total = state.lines.reduce((s, l) => s + (l.LineTotal || 0), 0);
    return { lineCount: state.lines.length, totalQty: qty, totalAmount: total };
}
