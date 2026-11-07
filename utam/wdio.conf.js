// Minimal wdio headless config for UTAM lane (CI runs `test:ui`).
exports.config = { runner: 'local', specs: ['./quoteToCash.test.js'], maxInstances: 1, capabilities: [{ browserName: 'chrome', 'goog:chromeOptions': { args: ['--headless'] } }], framework: 'jasmine' };
