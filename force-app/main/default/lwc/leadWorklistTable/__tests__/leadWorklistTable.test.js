import { createElement } from '@lwc/engine-dom';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getNewLeads from '@salesforce/apex/LeadController.getNewLeads';
import LeadWorklistTable from 'c/leadWorklistTable';

const getNewLeadsAdapter = registerApexTestWireAdapter(getNewLeads);

describe('c-lead-worklist-table', () => {
  afterEach(() => {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    getNewLeadsAdapter.reset();
  });

  it('renders rows from wired Apex', async () => {
    const el = createElement('c-lead-worklist-table', { is: LeadWorklistTable });
    document.body.appendChild(el);
    getNewLeadsAdapter.emit([{ Id: '00Q1', Name: 'Ada', Company: 'AE', Status: 'New', Email: 'a@x.com' }]);
    await Promise.resolve();
    const table = el.shadowRoot.querySelector('lightning-datatable');
    expect(table).not.toBeNull();
    expect(table.data).toHaveLength(1);
  });

  it('shows empty state when the queue is clear', async () => {
    const el = createElement('c-lead-worklist-table', { is: LeadWorklistTable });
    document.body.appendChild(el);
    getNewLeadsAdapter.emit([]);
    await Promise.resolve();
    expect(el.shadowRoot.querySelector('c-empty-state-wrap')).not.toBeNull();
  });
});
