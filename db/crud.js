const db = require("../db");

async function getWithName(name) {
  return await db
    .select("name", "signing_date")
    .from("signer")
    .where("name", name);
}

async function get() {
  return await db.select("*").from("signer").limit(10);
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
  getWithName,
};
