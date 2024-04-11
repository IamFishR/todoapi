var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var adminRouter = require('./routes/admin');
var askmeRouter = require('./routes/askme');
var tasksRouter = require('./routes/task');

var app = express();

// Define log format
const logFormat = '[:date[iso]] :method :url :status :response-time ms - :res[content-length]';
app.use(morgan(logFormat));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/admins', adminRouter);
app.use('/askme', askmeRouter);
app.use('/tasks', tasksRouter);

// invalid route
app.get('*', (req, res) => {
    res.status(404).json({ error: "Invalid route" });
});

module.exports = app;
