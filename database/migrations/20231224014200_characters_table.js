/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
  await knex.schema.createTable("characters", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("short_description").nullable();
    table.string("description").nullable();
    table.string("char_id").notNullable().unique();
    table.string("gender").nullable();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
  await knex.schema.dropTable("characters");
}

export { up, down };
