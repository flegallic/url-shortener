var createError = require('http-errors');
var express = require('express');
var path = require('path');

// event logging
const morgan = require("morgan");
app.use(morgan('combined'));

// secure apps by setting various HTTP headers
const helmet = require("helmet");
app.use(helmet());

// api access controls
var cors = require('cors');
const PORT = 3000;
const HOST = '0.0.0.0';
var corsOptions = { origin: `http://${HOST}:${PORT}`};
app.use(cors(corsOptions));
var cookieParser = require('cookie-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//import routes
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
