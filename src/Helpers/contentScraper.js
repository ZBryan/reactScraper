import rp from "request-promise";
import cheerio from "cheerio";

export async function iterator(title, uri, index) {
  uri = uri;

  let options = {
    uri: uri,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  let $ = await rp(options);

  let chapter = $("#chaptercontent").html();
  return { title, chapter, index };
}
