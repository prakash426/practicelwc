import { createElement } from '@lwc/engine-dom';
import EventPlayground from 'c/eventPlayground';

describe('c-event-playground', () => {
  afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
  });

  it('fires the view handler map in preview mode', async () => {
    const el = createElement('c-event-playground', { is: EventPlayground });
    document.body.appendChild(el);
    await Promise.resolve();
    el.shadowRoot.querySelector('.row').click();
    await Promise.resolve();
    expect(el.shadowRoot.textContent).toContain('previewed s1');
  });

  it('rewires to the edit handler map after toggle', async () => {
    const el = createElement('c-event-playground', { is: EventPlayground });
    document.body.appendChild(el);
    await Promise.resolve();
    el.shadowRoot.querySelector('lightning-button').click();
    await Promise.resolve();
    el.shadowRoot.querySelector('.row').click();
    await Promise.resolve();
    expect(el.shadowRoot.textContent).toContain('editing s1');
    expect(el.shadowRoot.querySelector('lightning-input')).not.toBeNull();
  });
});
