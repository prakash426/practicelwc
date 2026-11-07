const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
  ...jestConfig,
  moduleNameMapper: {
    '^@salesforce/apex$': '<rootDir>/force-app/test/jest-mocks/apex',
    '^lightning/navigation$': '<rootDir>/force-app/test/jest-mocks/lightning/navigation'
  },
  collectCoverageFrom: ['force-app/main/default/lwc/**/*.js', '!force-app/main/default/lwc/**/__tests__/**'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
