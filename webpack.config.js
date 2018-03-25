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
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'alcaeus.js',
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
      'commonjs2': 'rdf-parser-jsonld',
      'commonjs': 'rdf-parser-jsonld',
      'amd': 'rdf-parser-jsonld',
      'root': 'rdf-parser-jsonld'
    },
    'rdf-serializer-jsonld-ext': {
      'commonjs2': 'rdf-serializer-jsonld-ext',
      'commonjs': 'rdf-serializer-jsonld-ext',
      'amd': 'rdf-serializer-jsonld-ext',
      'root': 'rdf-serializer-jsonld-ext'
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
  },
  devtool: 'inline-source-map'
};
