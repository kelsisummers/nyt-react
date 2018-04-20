const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

const config = (req) => {
  return ({
  qs: {
    'api-key': "7aeacb6adb8f48308c7ee83c07ecabb3",
    'q': req.query.topic,
    'begin_date': req.query.begin_date,
    'end_date': req.query.end_date,
    'sort': "newest"
  }
  })
};

// request.get({
//   url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
//   qs: {
//     'api-key': "7aeacb6adb8f48308c7ee83c07ecabb3",
//     'q': "trump",
//     'begin_date': "20170331",
//     'end_date': "20180420",
//     'sort': "newest"
//   },
// }, function(err, response, body) {
//   body = JSON.parse(body);
//   console.log(body);
// })

router.get("/api/search", (req, res) => {
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", config)
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

// Matches with "/api/articles"
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);

module.exports = router;
