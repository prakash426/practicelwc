import { createElement } from '@lwc/engine-dom';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import { getRecord } from 'lightning/uiRecordApi';
import HelloLeadCard from 'c/helloLeadCard';

const getRecordAdapter = registerLdsTestWireAdapter(getRecord);

describe('c-hello-lead-card', () => {
  afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    getRecordAdapter.reset();
  });

  it('renders the Lead name greeting', async () => {
    const el = createElement('c-hello-lead-card', { is: HelloLeadCard });
    el.recordId = '00Q000000000001EAA';
    document.body.appendChild(el);
    getRecordAdapter.emit({
      fields: { Name: { value: 'Ada Lovelace' }, Company: { value: 'Analytical Engines' } }
    });
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('.greeting').textContent).toBe('Hello, Ada Lovelace!');
    expect(el.shadowRoot.textContent).toContain('Analytical Engines');
  });

  it('shows the illustration fallback when no record is wired', async () => {
    const el = createElement('c-hello-lead-card', { is: HelloLeadCard });
    document.body.appendChild(el);
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('lightning-illustration')).not.toBeNull();
  });
});
