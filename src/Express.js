/* eslint no-console: 0 */
const router = require('./routes/router.js');
const express = require('express');
const compression = require('compression');
// const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(`${__dirname}/dist`));
}
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));

router(app);

module.exports = {
  app,
  router,
  port,
};
