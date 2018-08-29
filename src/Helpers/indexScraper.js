import rp from "request-promise";
import cheerio from "cheerio";
import { iterator } from "./contentScraper";

const isAbsolute = new RegExp("^([a-z]+://|//)", "i");
// let base = "https://lnproxy.herokuapp.com/"
export async function getLinks(uri, baseUri, name, existing) {
  let options = {
    uri: uri,
    transform: body => {
      return cheerio.load(body);
    }
  };
  let $ = await rp(options);
  let aTag = $("a").not('[href^="/"],[href^="mailto:"],[href^="#"]');
  let promise = [];
  console.log("atag", aTag.length);
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
        //If the novel exists
        if (existing[name] && existing[name].chapter) {
          existingChp = existing[name].chapters.filter(
            //check for matching existing chapters
            ln => ln.title.toUpperCase() === title.toUpperCase()
          );
        }
        console.log(existingChp.length > 0);
        if (!existingChp.length > 0) {
          // console.log("index", index);
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
