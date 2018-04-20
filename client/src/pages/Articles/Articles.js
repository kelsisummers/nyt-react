import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    search: {
      topic: "",
      begin_date: "",
      end_date: ""
    },
    articles: []
    // {
    //   headline_main: "",
    //   pub_date: "",
    //   snippet: "",
    //   web_url: "",
    // }]
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data})
        // this.setState({ articles: [{headline_main: res.headline_main, pub_date: res.pub_date, snippet: res.snippet, web_url: res.web_url } ]})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.search(this.state.recipeSearch)
      .then(res => this.setState({ recipes: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    console.log("Articles?", this.state.articles)
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.search.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.search.begin_date}
                onChange={this.handleInputChange}
                name="beginDate"
                placeholder="Begin Date (required)"
              />
              <TextArea
                value={this.state.search.end_date}
                onChange={this.handleInputChange}
                name="endDate"
                placeholder="End Date (Required)"
              />
              <FormBtn
                disabled={!(this.state.search.topic && this.state.search.begin_date && this.state.search.end_date)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {/* {this.state.articles.length > 0  ? (
              <List>
                {this.state.articles.map((article) => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.headline_main}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )} */}
            <h3>No Results to Display</h3>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length > 0  ? (
              <List>
                {this.state.articles.map((article) => (
                  <ListItem key={article._id}>
                    {/* <Link to={article.web_url}> */}
                    <a href={article.web_url}>
                      <h4>
                        {article.headline_main}
                      </h4>
                    </a>
                    {/* </Link> */}
                      <p>{article.pub_date}</p>
                      <p>{article.snippet}</p>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
