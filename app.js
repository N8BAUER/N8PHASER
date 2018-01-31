const express = require("express");
const app = express()
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var cors = require('cors');
var dotenv =require('dotenv').config()
var utility = require('../utility')
const PORT = process.env.PORT || 8080;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: (domain, callback) => {
  callback(null, true);
}}));

const routes = require('./routes/index');
const api = require('./routes/api');

app.use("/", routes)
app.use("/api", api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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






app.listen(PORT, () => console.log(`listening on port ${PORT}`))
