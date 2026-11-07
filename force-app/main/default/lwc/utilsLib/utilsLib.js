/**
 * utilsLib: shared LWC service module (Level 1, Projects 1-9).
 * LWS-safe: no innerHTML, no data: URIs, no MutationObserver.
 */

/** Normalize any error shape (Apex, LDS, network) into string[]. */
export function reduceErrors(errors) {
  if (!errors) return [];
  const list = Array.isArray(errors) ? errors : [errors];
  return list
    .map((e) => {
      if (typeof e === 'string') return e;
      if (e?.body?.message) return e.body.message;
      if (e?.body?.pageErrors?.length) {
        return e.body.pageErrors.map((p) => p.message).join(', ');
      }
      if (e?.message) return e.message;
      if (e?.detail) return e.detail;
      return 'Unknown error';
    })
    .filter(Boolean);
}

/** Trailing-edge debounce. Returns a cancelable wrapper. */
export function debounce(fn, delay = 300) {
  let timerId;
  const debounced = function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
  debounced.cancel = () => clearTimeout(timerId);
  return debounced;
}

/** Build CSV text from rows + column keys, with RFC4180 quoting. */
export function buildCsv(rows, columns) {
  const esc = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = columns.map((c) => esc(c.label ?? c.fieldName)).join(',');
  const lines = (rows ?? []).map((r) =>
    columns.map((c) => esc(r[c.fieldName])).join(',')
  );
  return [header, ...lines].join('\n');
}

/**
 * LWS-clean file download via Blob + object URL.
 * Never use data: URIs (blocked by LWS at v67).
 */
export function downloadBlob(content, filename, mimeType = 'text/plain') {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return url;
}

export function downloadCsv(rows, columns, filename = 'export.csv') {
  return downloadBlob(buildCsv(rows, columns), filename, 'text/csv;charset=utf-8');
}

export function formatCurrency(value, currency = 'USD') {
  if (value === null || value === undefined) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value));
}
