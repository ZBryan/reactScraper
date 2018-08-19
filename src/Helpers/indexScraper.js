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
    transform: body => {
      return cheerio.load(body);
    }
  };
  let $ = await rp(options);
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
        // console.log("chapter", chapter);
        promise.push(chapter);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  });

  return promise;
  // rp(options).then(($) => {
  //   let selector = $("a");

  //   let promise = [];

  //   selector.each(function(index) {
  //     try {
  //       let title = $(this).text();
  //       let link = $(this).attr("href");

  //       if (
  //         index < 10 &&
  //         title &&
  //         link &&
  //         link.charAt(0) !== "/" &&
  //         link.charAt(0) !== "#"
  //       ) {
  //         if (!isAbsolute.test(link)) {
  //           link = baseUri + "/" + link;
  //         }

  //         let chapter = await iterator(title, link);
  //         console.log("chapter", chapter);
  //         promise.push(chapter);
  //       }
  //     } catch (err) {
  //       console.error("Error: ", err);
  //     }
  //   });

  //   return Promise.all(promise).then(values => {
  //     console.log("datat as values", values);
  //     return values;
  //     values.forEach((value, index) => {
  //       console.log(value.title);
  //       return value;
  //     });
  //   });
  // });
}
