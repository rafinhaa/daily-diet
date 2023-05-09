import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("meals", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.timestamp("eated_at").notNullable();
    table.boolean("on_the_diet").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
    table.timestamp("deleted_at").nullable();

    table
      .uuid("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("meals");
}
