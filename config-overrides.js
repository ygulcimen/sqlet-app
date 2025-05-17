const webpack = require("webpack");
const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...(config.resolve || {}),
    alias: {
      ...(config.resolve.alias || {}),
      xlsx: path.resolve(__dirname, "node_modules/xlsx/xlsx.js"),
    },
  };

  return config;
};
