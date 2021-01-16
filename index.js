let Parser = require("rss-parser");
let parser = new Parser();
const NDLRequestURL = "https://iss.ndl.go.jp/api/opensearch?isbn=";
let NDLSearchResult;
async function NDLSearch(ISBN) {
  let feed = await parser.parseURL(`${NDLRequestURL}+${ISBN}`);
  const TargetedBook = feed.items[0];
  if (!TargetedBook) {
    throw "Book not found.";
  } else {
    NDLSearchResult = {
      creator: feed.items[0].creator,
      title: feed.items[0].title,
      link: feed.items[0].link,
      author: feed.items[0].author,
      description: feed.items[0].contentSnippet,
      categories: feed.items[0].categories,
      pubDate: feed.items[0].pubDate,
      publisher: feed.items[0].publisher,
    };
  }
  return NDLSearchResult;
}

module.exports = NDLSearch;
