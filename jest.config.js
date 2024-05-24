module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],  // Adjust if your test directory has a different name or location
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  };
  