const connection = require('../database/connection');

//Responsável pelo perfil de uma entidade (ONG)

module.exports = {

  //RETORNA OS CASOS ESPECÍFICOS DE UMA ÚNICA ONG:
  async index(req, res) {
    //Acessar id da ong logada:
    const ong_id = req.headers.authorization;

    //Buscar todos os casos criados por essa ong logada na aplicação:
    const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

    return res.json(incidents);
  }

};
