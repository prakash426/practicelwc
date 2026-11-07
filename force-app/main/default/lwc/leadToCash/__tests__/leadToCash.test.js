import { createElement } from 'lwc';
import LeadToCash from 'c/leadToCash';
describe('leadToCash orchestrator', () => {
  afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); });
  it('renders progress + approval button', () => {
    const el = createElement('c-lead-to-cash', { is: LeadToCash });
    document.body.appendChild(el);
    expect(el.shadowRoot.querySelector('lightning-progress-indicator')).not.toBeNull();
    expect(el.shadowRoot.querySelector('lightning-button')).not.toBeNull();
  });
});
