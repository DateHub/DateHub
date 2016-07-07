var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: './client/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  query: {
    presets: ['react', 'es2015']
  },
  resolveLoader: {
    root: path.join(__dirname, './node_modules')
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};