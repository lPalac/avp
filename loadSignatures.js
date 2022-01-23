const Crawler = require("crawler");
var jsdom = require("jsdom");
const { get, create, disconnect } = require("./db/crud");

const nameRegexp =
  /(?<=\.\w+">).*?(?=<\/a>(:|\.))|(?<=<b>).*?(?=<\/b>(:|\.))/gm;
const signaturesRegexp = /(?<=\bSignatures Received:\s).*?(?=<b>)/gm;
const linksRegexp = /(?<=href=").*?(?=">)/gm;
let brojacStranica = 0;

const signsCrawler = new Crawler({
  rateLimit: 1000,
  jQuery: jsdom,
  callback: async function (err, res, done) {
    if (err) {
      console.log(err);
    } else {
      var names = res.body.match(nameRegexp);
      var signaturesDates = res.body.match(signaturesRegexp);
    
      await insertIntoDb(names, signaturesDates);
    }
    done();
  },
});

const pagesCrawler = new Crawler({
  maxConnections: 10,
  callback: function (err, res, done) {
    if (err) {
      console.log(err);
    } else {
      var pages = res.body.match(linksRegexp);
      pages = pages.map((page) => {
        return "https://agilemanifesto.org/display/" + page;
      });

      signsCrawler.queue(pages);
    }
    done();
  },
});

async function insertIntoDb(names, signaturesDates) {
  for (var i = 0; i < names.length; i++) {
    if (names[i].search("</a>") != -1) {
      continue;
    }

    await create(names[i], signaturesDates);
  }

  console.log("Page doone");
}

pagesCrawler.queue("https://agilemanifesto.org/display");
signsCrawler.on("drain", () => {
  disconnect();
});
