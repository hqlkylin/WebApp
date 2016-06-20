var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'kylin' /*加密*/}));

//文件上传
var multer  = require('multer');
var time = require('./public/javascripts/kylin');

app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    /*return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()*/
    return  new Date().format("yyyyMMddhhmmss");
  }
}))


var routes = require('./routes/index');
var activity = require('./routes/activity');
var users = require('./routes/users');


app.use('/', routes);
app.use('/activity', activity);
app.use('/users/', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(4000);
console.log("项目启动成功：http://localhost:4000");
module.exports = app;
