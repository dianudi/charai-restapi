/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
  await knex.schema.createTable("character_conversations", (table) => {
    table.increments();
    table.integer("consume_application_id").notNullable().unsigned();
    table.foreign("consume_application_id").references("id").inTable("consume_applications").onDelete("cascade").onUpdate("cascade");
    table.integer("character_id").notNullable().unsigned();
    table.foreign("character_id").references("id").inTable("characters").onDelete("cascade").onUpdate("cascade");
    table.string("conversation_id");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
  await knex.schema.dropTable("character_conversations");
}

export { up, down };
