const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

/*
cors - lib de segurança que define quem vai acessar
a aplicação
origin - define qual endereço poderá acessar a nossa aplicação
em produção: app.use(cors({
  origin: 'http://meuapp.com'
}));
em dev: app.use(cors()); //Assim todas as aplicações front-end poderá
acessar o back-end
*/