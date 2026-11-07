import { createElement } from 'lwc';
import SecureFileHub from 'c/secureFileHub';
describe('secureFileHub', () => {
  afterEach(() => { while (document.body.firstChild) document.body.removeChild(document.body.firstChild); });
  test('sanitizes malicious titles', () => {
    const el = createElement('c-secure-file-hub', { is: SecureFileHub });
    document.body.appendChild(el);
    expect(el.sanitize('<img src=x onerror=1>')).toBe('img src=x onerror=1');
    expect(el.sanitize('quote.pdf')).toBe('quote.pdf');
  });
});
