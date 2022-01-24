const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const { get, getWithName } = require("./db/crud");
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

app.get("/names", async (req, res) => {
  const results = await get();
  res.json(results);
});

app.get("/names/:name", async (req, res) => {
  const results = await getWithName(req.params.name);
  res.json(results);
});
