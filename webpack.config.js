var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    demoapp: './src/demoapp/main.ts',
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    path: './dist/bundles/',
    publicPath: '/bundles/',
  },
  devtool: 'inline-source-map',

  resolve: {
    root: path.resolve('./src'),
    extensions: [
      '', '.ts', '.js', '.scss', '.css', '.html', '.json', '.yaml',
    ],
  },

  node: {
    fs: "empty",
    tls: "empty",
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader?tsconfig=src/tsconfig.json' },
      { test: /\.s?css/, loader: 'css-to-string!css!sass'},
      { test: /\.ya?ml/, loader: 'json!yaml'},
      { test: /\.html?/, loader: 'html'},
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
};
