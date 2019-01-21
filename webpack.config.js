const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
        {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: [
                /\/jsonld\//
            ],
            query: {
                presets: [ 'env', 'stage-0' ]
            },
        }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  devtool: 'source-map'
};
