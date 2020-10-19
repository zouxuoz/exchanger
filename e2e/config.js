/* eslint-disable */

const merge = require('merge');
const tsPreset = require('ts-jest/jest-preset');
const jestPuppeteerDockerPreset = require('jest-puppeteer-docker/jest-preset');

const config = merge.recursive(tsPreset, jestPuppeteerDockerPreset, {
  rootDir: './',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/../tsconfig.json',
      diagnostics: false,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: [...jestPuppeteerDockerPreset.setupFilesAfterEnv, '<rootDir>//setup.ts'],
});

module.exports = config;
