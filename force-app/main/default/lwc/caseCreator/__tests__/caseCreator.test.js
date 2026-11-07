import { createElement } from '@lwc/engine-dom';
import CaseCreator from 'c/caseCreator';

jest.mock(
  'lightning/uiRecordApi',
  () => ({ createRecord: jest.fn() }),
  { virtual: true }
);
const { createRecord } = require('lightning/uiRecordApi');

describe('c-case-creator', () => {
  afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    jest.clearAllMocks();
  });

  it('creates a case and shows the upload step', async () => {
    createRecord.mockResolvedValue({ id: '5001' });
    const el = createElement('c-case-creator', { is: CaseCreator });
    document.body.appendChild(el);
    const subject = el.shadowRoot.querySelector('lightning-input');
    subject.value = 'Broken widget';
    subject.dispatchEvent(new CustomEvent('change'));
    el.shadowRoot.querySelector('lightning-button').click();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(createRecord).toHaveBeenCalledWith({
      apiName: 'Case',
      fields: expect.objectContaining({ Subject: 'Broken widget' })
    });
    expect(el.shadowRoot.querySelector('lightning-file-upload')).not.toBeNull();
  });
});
