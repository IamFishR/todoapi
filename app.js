var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var app = express();

// Define log format
const logFormat = '[:date[iso]] :method :url :status :response-time ms - :res[content-length]';
app.use(morgan(logFormat));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
// app.use('/admins', require('./routes/admin'));
app.use('/askme', require('./routes/askme'));
app.use('/tasks', require('./routes/task'));
app.use('/logs', require('./routes/log'));
app.use('/finances', require('./routes/finance'));
app.use('/ai', require('./routes/ai'));

// invalid route
app.get('*', (req, res) => {
    res.status(404).json({ error: "Invalid route" });
});

module.exports = app;
