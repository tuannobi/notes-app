// Update with your config settings.
const {knexSnakeCaseMappers} = require('objection')

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'note_app', 
      user: 'postgres',
      password: 'admin123'
    },
    pool: {
      min:2,
      max:10,
    },
    migration: {
      tableName:'knex_migration',
    },
    seeds: {
      directory: './seeds',
    },
    ...knexSnakeCaseMappers,
  },
};
