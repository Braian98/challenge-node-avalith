const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./configs');
require('./configs/database');
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(require('./routes'));

// Init
app.listen(port, () => {
    console.log('Server on port', port);
})