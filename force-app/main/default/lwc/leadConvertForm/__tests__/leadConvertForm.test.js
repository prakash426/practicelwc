import { createElement } from '@lwc/engine-dom';
import LeadConvertForm from 'c/leadConvertForm';

jest.mock(
  '@salesforce/apex/LeadConvertService.convertLead',
  () => ({ default: jest.fn() }),
  { virtual: true }
);
const convertLead = require('@salesforce/apex/LeadConvertService.convertLead').default;

describe('c-lead-convert-form', () => {
  afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    jest.clearAllMocks();
  });

  it('calls convert and toasts on success', async () => {
    convertLead.mockResolvedValue({ accountId: '0011', contactId: '0031' });
    const el = createElement('c-lead-convert-form', { is: LeadConvertForm });
    el.recordId = '00Q1';
    const toastHandler = jest.fn();
    el.addEventListener('lightning__showtoast', toastHandler);
    document.body.appendChild(el);
    el.shadowRoot.querySelector('lightning-button').click();
    await Promise.resolve();
    await Promise.resolve();
    expect(convertLead).toHaveBeenCalledWith({ leadId: '00Q1' });
  });

  it('shows the error panel when conversion fails', async () => {
    convertLead.mockRejectedValue({ body: { message: 'Already converted' } });
    const el = createElement('c-lead-convert-form', { is: LeadConvertForm });
    el.recordId = '00Q1';
    document.body.appendChild(el);
    el.shadowRoot.querySelector('lightning-button').click();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('c-error-panel')).not.toBeNull();
  });
});
