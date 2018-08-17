let request = require("request");
let rp = require("request-promise");
let cheerio = require("cheerio");
let fs = require("fs");

async function iterator(title, uri) {
  let options = {
    uri: uri,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  return rp(options)
    .then(function($) {
      let chapter = $("#chaptercontent").html();
      let obj = {};
      return { title, chapter };
    })
    .catch(function(err) {
      console.error(err);
    });
}
module.exports.iterator = iterator;
