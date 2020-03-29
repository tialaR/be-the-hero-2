const knex = require('knex');
const configuration = require('../../knexfile'); //configurações do BD

//Conexão com o BD (no modo dev)
const connection = knex(configuration.development);

//Exportando conexão com o BD
module.exports = connection;
