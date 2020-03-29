
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    //id e chave primária(autoincrementável 1,2,3...)
    table.increments(); 

    //Campos da tabela
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('value').notNullable(); 

    //Relacionamento entre tabelas
    table.string('ong_id').notNullable(); 

    //Chave estrangeira
    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
