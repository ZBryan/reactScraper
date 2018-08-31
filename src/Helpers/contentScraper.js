import rp from "request-promise";
import cheerio from "cheerio";

export async function iterator(title, uri, index) {
  let options = {
    uri: uri,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  let $ = await rp(options);

  let chapter = $("#chaptercontent").html();
  const ln = { title, chapter, index };
  // console.log("ln scr", ln);
  return ln;
}
