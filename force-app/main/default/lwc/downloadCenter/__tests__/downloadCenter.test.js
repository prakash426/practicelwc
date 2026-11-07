import { createElement } from '@lwc/engine-dom';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getProjects from '@salesforce/apex/ProjectController.getProjects';
import DownloadCenter from 'c/downloadCenter';

const getProjectsAdapter = registerApexTestWireAdapter(getProjects);

describe('c-download-center', () => {
  afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    getProjectsAdapter.reset();
    jest.restoreAllMocks();
  });

  it('exports CSV through the Blob object-URL path', async () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    Object.defineProperty(URL, 'createObjectURL', { value: createObjectURL, configurable: true });
    const el = createElement('c-download-center', { is: DownloadCenter });
    document.body.appendChild(el);
    getProjectsAdapter.emit([{ Id: 'a1', Name: 'Lobby', Status__c: 'New', Budget__c: 500 }]);
    await Promise.resolve();
    el.shadowRoot.querySelector('lightning-button').click();
    await Promise.resolve();
    expect(createObjectURL).toHaveBeenCalled();
    const blob = createObjectURL.mock.calls[0][0];
    expect(blob.type).toContain('text/csv');
  });

  it('disables export when there are no rows', async () => {
    const el = createElement('c-download-center', { is: DownloadCenter });
    document.body.appendChild(el);
    getProjectsAdapter.emit([]);
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('lightning-button').disabled).toBe(true);
    expect(el.shadowRoot.querySelector('c-empty-state-wrap')).not.toBeNull();
  });
});
