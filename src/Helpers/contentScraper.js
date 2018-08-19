// import request from "request";
import rp from "request-promise";
import cheerio from "cheerio";
// import fs from "fs";

export async function iterator(title, uri) {
  let options = {
    uri: uri,
    simple: true,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  let $ = await rp(options);

  let chapter = $("#chaptercontent").html();
  // let obj = {};
  return { title, chapter };
}
