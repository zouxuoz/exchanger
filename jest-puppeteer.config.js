/* eslint-disable */

const getConfig = require('jest-puppeteer-docker/lib/config');

const baseConfig = getConfig();
const customConfig = Object.assign({}, baseConfig);

customConfig.connect.defaultViewport = {
  width: 800,
  height: 800,
};

customConfig.chromiumFlags = ['–ignore-certificate-errors'];

module.exports = customConfig;
