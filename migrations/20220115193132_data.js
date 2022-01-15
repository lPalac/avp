exports.up = function (knex) {
  return knex.schema.createTable("signatory", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.date("signing_date");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("signatory");
};
