const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testTimeout: 20000,
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: [
    //'**/tests/**/*.test.ts',
    '**/step-definitions/**/*.steps.ts',
  ],
  reporters: [
    "default",
    ["jest-html-reporter", {
      pageTitle: "Test Report",
      outputPath: "./reports/test-report.html",
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ]
};