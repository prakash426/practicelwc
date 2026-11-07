import { createElement } from 'lwc';
import OfflineTechApp from 'c/offlineTechApp';
describe('offlineTechApp', () => {
  afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); localStorage.clear(); });
  test('queues drafts and syncs', async () => {
    const el = createElement('c-offline-tech-app', { is: OfflineTechApp });
    el.recordId = '0WO000000000001';
    document.body.appendChild(el);
    el.draftNotes = 'fixed valve';
    el.saveDraft();
    expect(el.queueCount).toBe(1);
    await el.syncNow();
    expect(el.queueCount).toBe(0);
  });
  test('flags conflict when server differs', async () => {
    const el = createElement('c-offline-tech-app', { is: OfflineTechApp });
    document.body.appendChild(el);
    el.draftNotes = 'mine'; el.serverNotes = 'theirs';
    el.saveDraft();
    await el.syncNow();
    expect(el.conflict).toBe(true);
    el.keepMine();
    expect(el.conflict).toBe(false);
  });
});
