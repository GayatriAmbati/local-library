var createError = require('http-errors');
var compression = require('compression');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

var app = express();

app.use(helmet());
var mongoose = require('mongoose');
//heroku config:set MONGODB_URI='mongodb+srv://library:library@cluster0.xo1ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//heroku config:set MONGODB_URI='mongodb+srv://library:library@cluster0.xo1ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
var url = 'mongodb+srv://library:library@cluster0.xo1ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var mongoDB =  url;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
//mongoose.connect('mongodb://localhost/users_test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression()); //Compress all routesnpm install helmetnpm install helmet

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/catalog',catalogRouter);
app.use('/users', usersRouter);


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
