const connection = require('../database/connection'); //conexão BD
const crypto = require('crypto'); //pacote node

//Cada entidade terá um controlador

//Controlador exporta um objeto c/ os métodos
module.exports = {

  //Método de listagem de ongs:
  async index (req, res) {
    //selecionando todas as ongs (array)
    const ongs = await connection('ongs').select('*');
    return res.json(ongs);
  }, 

  //Método de criação de ong:
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    //Criar id da ong:
    const id = crypto.randomBytes(4).toString('HEX');
    //Inserir na tabela ongs
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });
    return res.json({ id });
  }

};

/*
  Padrão MVC
  - Não deve conter mais de 5 métodos em um controller 
    - Criar
    - Listar
    - Deletar
    - Alterar
    - Retorna um único item
*/
