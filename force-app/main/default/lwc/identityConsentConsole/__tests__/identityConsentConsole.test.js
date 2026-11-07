import { createElement } from 'lwc';
import IdentityConsentConsole from 'c/identityConsentConsole';
import getConsents from '@salesforce/apex/ConsentService.getConsents';
jest.mock('@salesforce/apex/ConsentService.getConsents', () => ({ default: jest.fn() }), { virtual: true });
describe('identityConsentConsole toggle matrix', () => {
  afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });
  it('renders consent rows', async () => {
    getConsents.mockResolvedValue([{ contactId: '003x', contactName: 'Ada', purpose: 'Marketing', optIn: true }]);
    const el = createElement('c-identity-consent-console', { is: IdentityConsentConsole });
    document.body.appendChild(el);
    await Promise.resolve();
    expect(getConsents).toHaveBeenCalled();
  });
  it('handles empty brand data', async () => {
    getConsents.mockResolvedValue([]);
    const el = createElement('c-identity-consent-console', { is: IdentityConsentConsole });
    document.body.appendChild(el);
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('c-error-panel')).not.toBeNull();
  });
});
