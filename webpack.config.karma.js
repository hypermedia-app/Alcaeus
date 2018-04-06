const webpackConfig = require('./webpack.config');

webpackConfig.entry = {};
webpackConfig.module.rules.push(
  {
    test: /\.ts$/,
    use: 'istanbul-instrumenter-loader',
    exclude: [
      'node_modules',
      /\.spec\.ts$/
    ],
    enforce: "post",
  });

module.exports = webpackConfig;
