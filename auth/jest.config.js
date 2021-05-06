module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  maxWorkers: 1,
  setupFilesAfterEnv: ['./src/__tests__/setup.ts'],
  collectCoverage: false,
  collectCoverageFrom: ['./src/services/**/*', './src/controllers/**/*'],
  testMatch: ['**/__tests__/services/**/*', '**/__tests__/routes/**/*']
};
