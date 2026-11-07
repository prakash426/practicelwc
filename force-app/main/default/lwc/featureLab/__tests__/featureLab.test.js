import { createElement } from 'lwc';
import FeatureLab from 'c/featureLab';
import getFlags from '@salesforce/apex/FeatureFlagService.getFlags';
jest.mock('@salesforce/apex/FeatureFlagService.getFlags', () => ({ default: jest.fn() }), { virtual: true });
describe('featureLab', () => {
  afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });
  it('renders accordions and flags', async () => {
    getFlags.mockResolvedValue({ complexExprBeta: true });
    const el = createElement('c-feature-lab', { is: FeatureLab });
    document.body.appendChild(el);
    await Promise.resolve();
    expect(el.shadowRoot.querySelectorAll('details').length).toBe(3);
  });
});
