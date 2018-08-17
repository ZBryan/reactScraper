let request = "request";
let rp = require("request-promise");
let cheerio = require("cheerio");
let fs = require("fs");
const { iterator } = require("./contentScraper");

const isAbsolute = new RegExp("^([a-z]+://|//)", "i");
// setup for wuxia
let uri = "http://m.wuxiaworld.co/Peerless-Martial-God/all.html";
const baseUri = "http://m.wuxiaworld.co/Peerless-Martial-God";
console.log("Index Uri: ", uri);
let storages = [];
function getLinks() {
  let options = {
    uri: uri,
    transform: function(body) {
      return cheerio.load(body);
    }
  };
  rp(options).then(function($) {
    let selector = $("a");

    let promise = [];

    selector.each(function(index) {
      try {
        let title = $(this).text();
        let link = $(this).attr("href");

        if (
          index < 50 &&
          title &&
          link &&
          link.charAt(0) !== "/" &&
          link.charAt(0) !== "#"
        ) {
          if (!isAbsolute.test(link)) {
            link = baseUri + "/" + link;
          }

          let chapter = iterator(title, link);
          promise.push(chapter);
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    });

    Promise.all(promise).then(function(values) {
      values.forEach(function(value, index) {
        console.log(value.title);
      });
    });
  });
}
getLinks();
