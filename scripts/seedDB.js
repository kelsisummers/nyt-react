const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Articles collection and inserts the articles below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

const articleSeed = [
  {
    headline_main: "The Latest: Trump Claims Vindication After Memos Released",
    pub_date: "2018-04-19",
    snippet:
      "The Latest on former FBI Director James Comey's memos (all times local).",
    web_url: "https://www.nytimes.com/aponline/2018/04/19/us/politics/ap-us-congress-comey-memos-the-latest.html"
  },
  {
    headline_main: "AT&T Chief Attacks Lawsuit to Block Time Warner Merger",
    pub_date: "2018-04-19",
    snippet:
      "Randall Stephenson, AT&T’s chief executive, defended his deal to buy Time Warner and said a combined company would be no different than those that already exist in Silicon Valley.",
    web_url: "https://www.nytimes.com/2018/04/19/technology/att-ceo-time-warner-merger.html"
  },
  {
    headline_main: "Is Russia Sponsoring Terrorism?",
    pub_date: "2018-04-19",
    snippet:
      "From poison to cyberattacks, Moscow has violated countless norms of warfare and sovereignty.",
    web_url: "https://www.nytimes.com/2018/04/19/opinion/russia-sponsoring-terrorism.html"
  },
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
