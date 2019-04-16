const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/users', require('./users'));
app.use('/cinemas', require('./cinemas'));
app.use('/movies', require('./movies'));
app.use('/functions', require('./functions'));
app.use('/purchases', require('./purchases'));
app.use('/rooms', require('./rooms'));

module.exports = app;