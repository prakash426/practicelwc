import { createElement } from '@lwc/engine-dom';
import RecordHeaderWidgets from 'c/recordHeaderWidgets';

describe('c-record-header-widgets', () => {
  afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
  });

  it('renders SLA countdown and health score from props', async () => {
    const el = createElement('c-record-header-widgets', { is: RecordHeaderWidgets });
    el.slaDeadline = new Date(Date.now() + 3 * 86400000).toISOString();
    el.healthScore = 90;
    document.body.appendChild(el);
    await Promise.resolve();
    expect(el.shadowRoot.textContent).toContain('3d left');
    expect(el.shadowRoot.textContent).toContain('Healthy');
  });

  it('shows illustrations when props are blank', async () => {
    const el = createElement('c-record-header-widgets', { is: RecordHeaderWidgets });
    document.body.appendChild(el);
    await Promise.resolve();
    expect(el.shadowRoot.textContent).toContain('No deadline set');
    expect(el.shadowRoot.textContent).toContain('No score yet');
  });

  it('hides widgets per boolean props', async () => {
    const el = createElement('c-record-header-widgets', { is: RecordHeaderWidgets });
    el.showSla = false;
    el.showHealth = false;
    document.body.appendChild(el);
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('[data-testid="sla"]')).toBeNull();
    expect(el.shadowRoot.querySelector('[data-testid="health"]')).toBeNull();
  });

  it('flags overdue SLAs', async () => {
    const el = createElement('c-record-header-widgets', { is: RecordHeaderWidgets });
    el.slaDeadline = '2000-01-01';
    document.body.appendChild(el);
    await Promise.resolve();
    expect(el.shadowRoot.textContent).toContain('Overdue');
  });
});
