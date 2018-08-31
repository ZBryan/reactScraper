import rp from "request-promise";
import cheerio from "cheerio";
import { iterator } from "./contentScraper";

const isAbsolute = new RegExp("^([a-z]+://|//)", "i");
export async function getLinks(uri, baseUri, name, state, chunkSize) {
  let options = {
    uri: uri,
    transform: body => {
      return cheerio.load(body);
    }
  };
  let $ = await rp(options);
  let aTag = $("a").not('[href^="/"],[href^="mailto:"],[href^="#"],[title=""]');
  let promise = [];
  console.log("atag", aTag.length);
  aTag.each(function(index) {
    try {
      let title = $(this).text();
      let link = $(this).attr("href");
      if (index < 10 && title) {
        if (!isAbsolute.test(link)) {
          link = baseUri + "/" + link;
        }
        console.log("Index", index);
        let existingChp = null;
        //If the novel exists
        let chunk = Math.floor(index / chunkSize);
        console.log("chunk", chunk);
        if (state[name] && state[name][chunk]) {
          existingChp = state[name][chunk][index - 1];

          console.log("existing chapter", existingChp);
        }
        if (!existingChp) {
          let chapter = iterator(title, link, index);
          promise.push(chapter);
        } else {
          promise.push(existingChp);
        }
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  });

  return promise;
}
