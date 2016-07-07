var path = require('path');

module.exports = {
  entry: './client/src/app.js',
  output: {
    path: './client/',
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