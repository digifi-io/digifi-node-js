/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2020',
          parser: { syntax: 'typescript' },
        },
        module: { type: 'commonjs' },
        sourceMaps: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js'],
};
