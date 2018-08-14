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
    // console.log(typeof selector);
    // console.log("selector", selector);
    let obj = {};
    selector.each(function() {
      try {
        let title = $(this).text();
        let link = $(this).attr("href");
        if (title && link && link.charAt(0) !== "/") {
          if (!isAbsolute.test(link)) {
            link = baseUri + link;
          }
          // console.log(title, link);
          obj[title] = link;
          // let chapter = iterator(link);
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    });
    let promise = [];
    for (let key in obj) {
      let chapter = iterator(obj[key]);
      promise.push(chapter);
      // console.log(chapter);
    }
    Promise.all(promise).then(function(values) {
      console.log(values);
    });
  });
}
getLinks();
