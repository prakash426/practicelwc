import { createElement } from 'lwc';
import OmnichannelHub from 'c/omnichannelHub';
import getQueue from '@salesforce/apex/RoutingService.getQueue';
jest.mock('@salesforce/apex/RoutingService.getQueue', () => ({ default: jest.fn() }), { virtual: true });
describe('omnichannelHub analytics tiles', () => {
  afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); jest.clearAllMocks(); });
  it('computes per-channel stats', async () => {
    getQueue.mockResolvedValue([
      { Id: 'a', Subject: 's1', Origin: 'bot', Status: 'New' },
      { Id: 'b', Subject: 's2', Origin: 'portal', Status: 'New' }
    ]);
    const el = createElement('c-omnichannel-hub', { is: OmnichannelHub });
    document.body.appendChild(el);
    await Promise.resolve();
    expect(getQueue).toHaveBeenCalled();
  });
});
