/**
 * This file runs a webpack-dev-server, using the API.
 *
 * For more information on the options passed to WebpackDevServer,
 * see the webpack-dev-server API docs:
 * https://github.com/webpack/docs/wiki/webpack-dev-server#api
 * @ignore
 */
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config.js');
const path = require('path');
const colors = require('colors');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: 'www',
  open: true,
  hot: true,
  filename: 'main.js',
  publicPath: '/',
  stats: {
    colors: true,
  },  
});
server.listen(8080, '0.0.0.0', function() { 
  console.log("POINT YOUR BROWSER TO http://localhost:8080 IF THIS DOESN'T HAPPEN AUTOMATICALLY".yellow);
  console.log("ENJOY IT. SALUT I RES PUBLICA!".red);
  
});