/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
  await knex.schema.createTable("consume_applications", (table) => {
    table.increments("id");
    table.string("name");
    table.string("description");
    table.string("access_token");
    table.boolean("multiple_conversation").defaultTo(true);
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
  await knex.schema.dropTable("consume_applications");
}

export { up, down };
