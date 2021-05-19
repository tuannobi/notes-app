
exports.up = function(knex) {
  return knex.schema
  .createTable('notes', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.string('content');
      table.timestamps(true, true);
  })
  .createTable('demo', (table) => {
     table.increments();
     table.string('name'); 
  });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('notes')
    .dropTableIfExists('demo');  
};
