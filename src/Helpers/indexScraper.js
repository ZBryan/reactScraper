import rp from "request-promise";
import cheerio from "cheerio";
import { iterator } from "./contentScraper";

const isAbsolute = new RegExp("^([a-z]+://|//)", "i");

export async function getLinks(uri, baseUri) {
  let options = {
    uri: uri,

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
        promise.push(chapter);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  });

  return promise;
}
