import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("point_items", table => {
    table.increments("id").primary(); //Integer por padrão.

    //Cria uma chave estrangeira na tabela POINTS no campo ID.
    table.integer("point_id").notNullable().references("id").inTable("points");

    //Cria uma chave estrangeira na tabela ITEMS no campo ID.
    table.integer("item_id").notNullable().references("id").inTable("items");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("point_items");
}
