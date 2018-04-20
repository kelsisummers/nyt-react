import axios from "axios";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  // getArticle: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  // getSaved: function() {
  //   return axios.get("/api/articles/saved");
  // },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  searchArticles: function(query) {
    return axios.get("/api/search", { params: { q: query } });
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
