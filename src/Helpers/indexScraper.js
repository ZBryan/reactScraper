// import request from "request";
import rp from "request-promise";
import cheerio from "cheerio";
// import fs from "fs";
import { iterator } from "./contentScraper";

const isAbsolute = new RegExp("^([a-z]+://|//)", "i");
// setup for wuxia
// let uri = "http://m.wuxiaworld.co/Peerless-Martial-God/all.html";
// const baseUri1 = "http://m.wuxiaworld.co/Peerless-Martial-God";
// console.log("Index Uri: ", uri);
// let storages = [];
export async function getLinks(uri, baseUri) {
  // console.log(uri, baseUri);
  let options = {
    uri: uri,
    // headers: {
    //   "User-Agent": "Request-Promise",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    // },
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
          index < 10 &&
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
        console.log(value.chapter);
        return value;
      });
    });
  });
}
