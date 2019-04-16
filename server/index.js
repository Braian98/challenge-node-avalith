const express = require('express');
const bodyParser = require('body-parser');

require('./configs');
require('./configs/database');
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Routes
app.use(require('./routes'));

// Init
app.listen(port, () => {
    console.log('Server on port', port);
})