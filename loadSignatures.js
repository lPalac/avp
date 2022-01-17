const Crawler = require("crawler");

const nameRegexp = /(?<=\.\w+">).*?(?=<\/a>(:|\.))|(?<=<b>).*?(?=<\/b>(:|\.))/gm;
const signaturesRegexp = /(?<=\bSignatures Received:\s).*?(?=<b>)/gm;

var c = new Crawler({
    maxConnections: 10,
    callback: function (err, res, done) {
        if (err) {
            console.log(err);
        } else {
            var names = res.body.match(nameRegexp);
            var signaturesDates = res.body.match(signaturesRegexp)
            console.log(names);
            console.log(names.length);
            console.log(signaturesDates);
        }  
        done();
    }
});

c.queue('https://agilemanifesto.org/display/000000001.html');