import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, Date, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    searches: [],
    query: 
    {
      q: "",
      begin_date: "",
      end_date: ""
    },
    articles: []
  };

  componentDidMount() {
    this.loadArticles();
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      query: {
        ...this.state.query,
        [name]: value
      }
    })
  }

  handleClick = event => {
    event.preventDefault()
    console.log("what is event?", event.target)
    this.findArticles(this.state.query);
  }

  findArticles = (query) => {
    API.searchArticles(query)
    .then(res => 
    this.setState({
      searches: res.data.response.docs
    })
  )
  .catch(err => console.log(err))
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };


  saveArticle = (i) => {
    API.saveArticle({
      headline_main: this.state.searches[i].headline.main,
      web_url: this.state.searches[i].web_url,
      pub_date: this.state.searches[i].pub_date,
      snippet: this.state.searches[i].snippet
    })
    .then(res => this.loadArticles())
    .catch(err => console.log(err));
  }

  render() {
    // const { searches } = this.props;
    console.log("What is our state", this.state);
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={this.onChange}
                name="q"
                placeholder="Topic (required)"
              />
              <p>Start Date:</p>
              <Date
                onChange={this.onChange}
                name="begin_date"
              />
              <p>End Date:</p>
              <Date
                onChange={this.onChange}
                name="end_date" 
              />

        
              <FormBtn
                onClick={this.handleClick}
              >
                Search Articles
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {this.state.searches.length > 0  ? (
            <List>
                {this.state.searches.map((search, i) => (
                  <ListItem key={i}>
                  <SaveBtn onClick={() => this.saveArticle(i)}/>
                    <a href={search.web_url}>
                      <h4>
                        {search.headline.main}
                      </h4>
                    </a>
                    
                      <p>{search.pub_date}</p>
                      <p>{search.snippet}</p>
                    
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
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
                  <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    <a href={article.web_url}>
                      <h4>
                        {article.headline_main}
                      </h4>
                    </a>
                      <p>{article.pub_date}</p>
                      <p>{article.snippet}</p>
                    
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
