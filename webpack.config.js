const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'main.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],  
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(eot|ttf|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader" }
    ]
  },
  watchOptions: {
    poll: 1000 // Check for changes every second
  }
};