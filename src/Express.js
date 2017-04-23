const express = require('express');
const expressHandlebars = require('express-handlebars');
const router = require('./routes/router.js');
const path = require('path');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(favicon(`${__dirname}/../client/img/spexFavicon.png`));
app.use(cookieParser());

router(app);

module.exports = {
  app,
  router,
  port,
};
