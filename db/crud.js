const db = require("../db");

async function get(name) {
  result = await db
    .select("name", "signing_date")
    .from("signer")
    .where("name", name);

  return result;
}

async function create(name, signing_date) {
  // console.log(name+signing_date)
  // console.log("--------------------------------")

  result = await db.insert({ name, signing_date }, "id").into("signer");
  return result;
}

async function disconnect() {
  db.destroy();
}

module.exports = {
  create,
  get,
  disconnect,
};
