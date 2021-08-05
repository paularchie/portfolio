const path = require("path");

module.exports = {
  // preset: 'ts-jest',
  // testEnvironment: 'node',
  // verbose: true,
  // clearMocks: true,
  // maxWorkers: 1,
  // // setupFilesAfterEnv: ['./src/__tests__/setup.ts'],
  // collectCoverage: false,
  // // collectCoverageFrom: ['./src/**/*'],
  // testMatch: ['**/*.test.ts']
  preset: "ts-jest",
  testEnvironment: path.join(__dirname, "prisma", "prisma-test-environment.js"),
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
