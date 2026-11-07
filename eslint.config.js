// Flat ESLint config for PracticeLWC. Run `npm run lint` after `npm install`.
// Includes Lightning Web Security minded rules via @salesforce/eslint-plugin-lwc.
const lwcConfig = require('@salesforce/eslint-config-lwc/recommended');

module.exports = [
  {
    ignores: ['node_modules/**', 'coverage/**', '.sfdx/**', '.localdevserver/**', 'utam/**']
  },
  {
    files: ['force-app/main/default/lwc/**/*.js'],
    ...lwcConfig
  }
];
