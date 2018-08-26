import rp from "request-promise";
import cheerio from "cheerio";
import { iterator } from "./contentScraper";

const isAbsolute = new RegExp("^([a-z]+://|//)", "i");
// let base = "https://lnproxy.herokuapp.com/"
export async function getLinks(uri, baseUri, name, existing) {
  uri = uri;

  let options = {
    uri: uri,
    transform: body => {
      return cheerio.load(body);
    }
  };
  let $ = await rp(options);
  let aTag = $("a");
  let promise = [];
  console.log("atag", aTag.first());
  aTag.each(function(index) {
    try {
      let title = $(this).text();
      let link = $(this).attr("href");
      if (
        index < 20 &&
        title &&
        link &&
        link.charAt(0) !== "/" &&
        link.charAt(0) !== "#"
      ) {
        if (!isAbsolute.test(link)) {
          link = baseUri + "/" + link;
        }
        let existingChp = 0;
        if (existing[name]) {
          existingChp = existing[name].chapters.filter(ln => ln.title == title);
        }
        console.log(existingChp.length > 0);
        if (!existingChp.length > 0) {
          // console.log("index", index);
          let chapter = iterator(title, link, index);
          promise.push(chapter);
        }
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  });

  return promise;
}
