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
async function getLinks() {
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
    async function processLinks(selector) {
      selector.each(function() {
        try {
          let title = $(this).text();
          let link = $(this).attr("href");
          if (title && link && link.charAt(0) !== "/") {
            if (!isAbsolute.test(link)) {
              link = baseUri + link;
            }
            console.log(title, link);
            async(function(){
                let chapter = await iterator(link);
            }).then(console.log(chapter))
            // let chp = iterator(link);
            //   iterator(uri)
            //     .then(function(result) {
            //       // ...
            //       console.log(result);
            //     })
            //     .catch(function(err) {
            //       // if you have an error
            //       console.err("shits fucked", err);
            //     });
            //   console.log(chp);
          }
        } catch (err) {
          console.error("Error: ", err);
        }
      });
    }
    processLinks(selector);
  });
}
getLinks();
