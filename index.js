const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { get, create, disconnect } = require("./db/crud");

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
console.log(dom.window.document.querySelector("p").textContent); // "Hello world"

async function getSpecificName(name) {
  let result = await get(name);
  console.log(result);
  disconnect();
}

getSpecificName("Alan Francis");
