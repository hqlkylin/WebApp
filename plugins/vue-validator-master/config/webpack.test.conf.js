var webpack = require('webpack')

module.exports = {
  entry: 'mocha!./test/specs/index.js',
  output: {
    path: './test/specs',
    filename: 'specs.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    noParse: [
      /node_modules\/sinon\//
    ],
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules|vue\/dist/,
      loader: 'babel',
      query: {
        presets: ['es2015-loose'],
        plugins: [
          'babel-plugin-espower',
          'babel-plugin-rewire'
        ]
      }
    }],
    postLoaders: [{
      test: /\.json$/,
      loader: 'json'
    }]
  },
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon.js'
    }
  },
  devServer: {
    contentBase: './test/specs',
    port: 8081,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
