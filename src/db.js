import knex from "knex";
import { resolve } from "node:path";

const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: resolve("database/data/db.sqlite3"),
  },
  useNullAsDefault: true,
});

export default db;
