import { createElement } from '@lwc/engine-dom';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import search from '@salesforce/apex/KnowledgeSearchController.search';
import KnowledgeFinder from 'c/knowledgeFinder';

const searchAdapter = registerApexTestWireAdapter(search);
jest.useFakeTimers();

describe('c-knowledge-finder', () => {
  afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    searchAdapter.reset();
    jest.clearAllTimers();
  });

  it('debounces keystrokes into a single search', async () => {
    const el = createElement('c-knowledge-finder', { is: KnowledgeFinder });
    document.body.appendChild(el);
    const input = el.shadowRoot.querySelector('lightning-input');
    input.value = 'a';
    input.dispatchEvent(new CustomEvent('change'));
    input.value = 'ab';
    input.dispatchEvent(new CustomEvent('change'));
    input.value = 'abc';
    input.dispatchEvent(new CustomEvent('change'));
    expect(searchAdapter.getLastConfig()).toBeFalsy();
    jest.advanceTimersByTime(300);
    await Promise.resolve();
    expect(searchAdapter.getLastConfig()).toEqual({ term: 'abc' });
  });

  it('shows empty state when search returns no hits', async () => {
    const el = createElement('c-knowledge-finder', { is: KnowledgeFinder });
    document.body.appendChild(el);
    const input = el.shadowRoot.querySelector('lightning-input');
    input.value = 'zzz-no-match';
    input.dispatchEvent(new CustomEvent('change'));
    jest.advanceTimersByTime(300);
    searchAdapter.emit([]);
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('c-empty-state-wrap')).not.toBeNull();
  });
});
