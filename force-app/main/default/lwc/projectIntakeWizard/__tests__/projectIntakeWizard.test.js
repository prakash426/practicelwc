import { createElement } from '@lwc/engine-dom';
import ProjectIntakeWizard from 'c/projectIntakeWizard';

jest.mock(
  'lightning/uiRecordApi',
  () => ({ createRecord: jest.fn() }),
  { virtual: true }
);
const { createRecord } = require('lightning/uiRecordApi');

function clickByLabel(el, label) {
  const btn = [...el.shadowRoot.querySelectorAll('lightning-button')].find(
    (b) => b.label === label
  );
  btn.click();
}

describe('c-project-intake-wizard', () => {
  afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    jest.clearAllMocks();
  });

  it('blocks Next on step 1 without a name, then walks all steps and submits', async () => {
    createRecord.mockResolvedValue({ id: 'a001' });
    const el = createElement('c-project-intake-wizard', { is: ProjectIntakeWizard });
    document.body.appendChild(el);

    clickByLabel(el, 'Next');
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('lightning-progress-indicator').currentStep).toBe('1');

    const nameInput = el.shadowRoot.querySelector('lightning-input');
    nameInput.value = 'Lobby Refit';
    nameInput.dispatchEvent(new CustomEvent('change'));
    clickByLabel(el, 'Next');
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('lightning-progress-indicator').currentStep).toBe('2');

    clickByLabel(el, 'Back');
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('lightning-progress-indicator').currentStep).toBe('1');

    clickByLabel(el, 'Next');
    await Promise.resolve();
    clickByLabel(el, 'Next');
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('lightning-progress-indicator').currentStep).toBe('3');

    clickByLabel(el, 'Submit');
    await Promise.resolve();
    await Promise.resolve();
    expect(createRecord).toHaveBeenCalledWith({
      apiName: 'Project__c',
      fields: expect.objectContaining({ Name: 'Lobby Refit' })
    });
    expect(el.shadowRoot.querySelector('lightning-file-upload')).not.toBeNull();
  });
});
