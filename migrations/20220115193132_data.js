exports.up = function (knex) {
  return knex.schema.createTable("signer", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("signing_date").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("signer");
};
