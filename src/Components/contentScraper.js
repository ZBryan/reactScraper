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
  // console.log("Uri Passed", uri);
  // console.log("options", options);

  return rp(options)
    .then(function($) {
      let chapter = $("#chaptercontent").html();
      let obj = {};
      return { title, chapter };
      // console.log("selector", selector);
      // // fs.appendFileSync(filename, title);
      // selector.each(function(index) {
      //   console.log($(this));
      //   return $(this).text();
      // });
    })
    .catch(function(err) {
      console.error(err);
    });
}
module.exports.iterator = iterator;
