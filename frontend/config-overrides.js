const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    process: require.resolve('process/browser.js'),
    util: require.resolve('util/'),
    vm: false,
    url: false,
    fs: false,
    net: false,
    tls: false,
    child_process: false,
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js',
    }),
  ];

  // Fix for ESM modules
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  });

  return config;
};
