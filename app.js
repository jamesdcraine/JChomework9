const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiRoutes =  require('./routes/notes');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('/notes', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


module.exports = app;
