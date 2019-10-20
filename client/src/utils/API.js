import axios from "axios";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },

  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },

  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  searchArticles: function(query) {
    const q = query.q.toLowerCase();
    const begin_date = query.begin_date.replace(/[-]/g, '');
    const end_date = query.end_date.replace(/[-]/g, '');

    const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=pDi6qkATQVvNGTumqXsVNOL0VJOSkL1t&sort=newest&fl=web_url,snippet,headline,pub_date&q=${q}&begin_date=${begin_date}&end_date=${end_date}`;
    return axios
    .get(apiUrl)
  }
};
