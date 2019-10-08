const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://air-cnc:air-cnc@air-cnc-aqhz6.mongodb.net/air-cnc?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)



app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3001);

