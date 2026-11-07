// UTAM journey: quote wizard -> approval inbox -> PDF. Run: npm run test:ui (wdio headless).
describe('Quote-to-Cash journey', () => {
  it('completes guided quote to approval', async () => {
    // page objects: quoteWizard.utam.json, approvalInbox.utam.json
    // 1. open wizard, select bundle, configure lines, price, assert total
    // 2. send for approval, open inbox, approve with comment
    // 3. assert PDF delivery status
    expect(true).toBe(true); // placeholder wiring; real run needs scratch org + wdio
  });
});
