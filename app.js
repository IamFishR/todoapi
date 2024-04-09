var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var adminRouter = require('./routes/admin');
// var askmeRouter = require('./routes/askme');
// var tasksRouter = require('./routes/items');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/admins', adminRouter);
// app.use('/askme', askmeRouter);
// app.use('/items', tasksRouter);

// invalid route
app.get('*', (req, res) => {
    res.status(404).json({ error: "Invalid route" });
});

module.exports = app;
