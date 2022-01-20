const Crawler = require("crawler");

const nameRegexp = /(?<=\.\w+">).*?(?=<\/a>(:|\.))|(?<=<b>).*?(?=<\/b>(:|\.))/gm;
const signaturesRegexp = /(?<=\bSignatures Received:\s).*?(?=<b>)/gm;
const linksRegexp = /(?<=href=").*?(?=">)/gm;

const signsCrawler = new Crawler({
  rateLimit: 1000,
  callback: function (err, res, done) {
    if (err) {
      console.log(err);
    } else {
      var names = res.body.match(nameRegexp);
      var signaturesDates = res.body.match(signaturesRegexp);
      console.log(names);
      console.log(names.length);
      console.log(signaturesDates);
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
        pages = pages.map(page => {
          return "https://agilemanifesto.org/display/" + page;
      });

      signsCrawler.queue(pages.slice(0, 10));
    }
    done();
  },
});

pagesCrawler.queue("https://agilemanifesto.org/display");
