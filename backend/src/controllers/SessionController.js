const connection = require('../database/connection');

//Rota de Login (determina o início de uma sessão)

module.exports = {

  //CRIAR SESSÃO DE LOGIN DE ONG
  async create(req, res) {
     //Verificar se a Ong existe p/ validar o login dela:
     //Recuperar id da ong pelo corpo da req
      const { id } = req.body;
      
      //Tentar buscar ong no banco:
      const ong = await connection('ongs').where('id', id).select('name').first();
      //firt() não retorna um array, retorna apenas um resultado

      if(!ong){
        //Caso a ong não exista no banco retorno um status de bad request com mensagem de erro
        return res.status(400).json({ error: 'No ONG found with this ID' });
      }

      //Se tudo der certo, retornar dados da ong:
      return res.json(ong);
  }

};
