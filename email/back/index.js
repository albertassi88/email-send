const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require("./src/db");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

const clientController = require('./src/client/controller');

app.use('/client', clientController);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
