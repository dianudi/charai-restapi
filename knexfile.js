// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./database/data/db.sqlite3",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations",
    },
  },

  staging: {
    client: "better-sqlite3",
    connection: {
      filename: "./database/data/db.sqlite3",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations",
    },
  },

  production: {
    client: "better-sqlite3",
    connection: {
      filename: "./database/data/db.sqlite3",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations",
    },
  },
};
