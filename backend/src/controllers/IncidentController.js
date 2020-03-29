 const connection = require('../database/connection');

module.exports = {

  //LISTAR CASOS:
  async index(req, res) {

    //Paginação:
    const { page = 1 } = req.query; 
    //Se page não existir vou buscar por padrão a página 1

    //Capturar quantidade de casos existentes na base de dados (tabela de casos):
    const [count] = await connection('incidents').count();
    //Retorna um objeto { 'count(*)': 14 }

    //Buscar no banco com paginaçao
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);

      //limit(5) - vai limitar a busca no banco p/ 5 registros
      //offset((page -1) * 5) - vai pular de 5 em 5 registros (paginação)
      /*
        join() - serve para unir dados de duas tabelas

        join('ongs', 'ong.id', '=', 'incidents.ong_id') - comparando 
        ong_id(id da ong de cada incidente) e trazendo
        os dados da ong relacionada com aquele incidente

        select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatssap', 'ongs.city', 'ongs.uf']);
        vai selecionar todos os incidentes com somente algumas propriedades
        das ongs relacionadas a eles (ex: name, email, etc..)
      */

      /* Inserir a quantidade de casos(registros) no header da 
      response com a propriedade 'X-Total-Count' e valor count['count(*)'] */
      res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  //CRIAR CASO:
  async create(req, res) {
    const { title, description, value } = req.body;
    /*Através do cabeçalho da req da p/ saber qual ong está
     logada na aplicação(qual ong está criando o incident),
     ele guarda informações do contexto da requisição, normalmente
     composta por dados da autenticação, localização do usuário */
     
     //Acessando id da ong:
     const ong_id = req.headers.authorization;

     //Cadastrando no banco
     /*Um id é gerado a partir do cadastro (como foi a inserção de um único registro,
       vai gerar uma array com uma única posição) */
     const [id] = await connection('incidents').insert({
       title,
       description,
       value,
       ong_id
     });

     return res.json({ id });
  },

  //DELETAR CASO:
  async delete(req, res) {
    //Para saber o caso q/ deseja deletar, recuperar o id da req
    const { id } = req.params;
    //Recuperar id da ong logada
    const ong_id = req.headers.authorization;

    /*Verificar se o incidente q está sendo deletado foi
     criado pela ong q está querendo deletar ele, caso contrário
     tal ação não pode ser permitida (uma ong não pode deletar o caso de outra) */

    //Resgatar incidente da tabela onde o id for igual ao id do req.parms:
    //Dessa busca selecionar apenas o id da ong q está deletando (q/ está relacionado ao caso)
    //frist() - retorna apenas 1 resultado
    /*
      Recuperar id da ong q/ criou o caso no banco e comparar com a ong que
      está logada na aplicação tentando excluir o caso
    */
    const incident = await connection('incidents').where('id', id).select('ong_id').first();

    //Verificar de ong_id buscado no banco é igual ao ond_id logado na aplicação
    if(incident.ong_id !== ong_id){
      //Erro de autorização (troca o status do código http)
      return res.status(401).json({ erro: "Operation not permitted" });
    }

    //Se tudo der certo, deletar caso do banco:
    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
    //Enviando resposta de sucesso sem corpo(send())
  }

};
