var path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'heracles.js',
    library: 'Hydra',
    libraryTarget: 'umd'
  },
  externals: {
    'rdf-ext': {
      'commonjs2': 'rdf-ext',
      'commonjs': 'rdf-ext',
      'amd': 'rdf-ext',
      'root': 'rdf'
    },
    'rdf-parser-jsonld': {
      'commonjs2': 'rdf-ext',
      'commonjs': 'rdf-ext',
      'amd': 'rdf-ext',
      'root': 'rdf'
    },
    'rdf-serializer-jsonld': {
      'commonjs2': 'rdf-ext',
      'commonjs': 'rdf-ext',
      'amd': 'rdf-ext',
      'root': 'rdf'
    },
    'jsonld': {
      'commonjs2': 'jsonld',
      'commonjs': 'jsonld',
      'amd': 'jsonld',
      'root': 'jsonld'
    },
    'isomorphic-fetch': {
      'commonjs2': 'isomorphic-fetch',
      'commonjs': 'isomporphic-fetch',
      'amd': 'isomporphic-fetch',
      'root': 'fetch'
    }
  }
  //devtool: 'inline-source-map'
};