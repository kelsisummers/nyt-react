import React, { Component } from "react";
import Moment from 'react-moment';

import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
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

  // onChange = e => {
  //   const { name, value } = e.target;
  //   this.setState({
  //     query: {
  //       ...this.state.query,
  //       [name]: value
  //     }
  //   })
  // }

  // formatForApi = obj => {
  //   return Object.entries(obj).map(item => {
  //     return { [item[0]]: item[1] };
  //   })
  // }

  // submit = e => {
  //   e.preventDefault();
  //   const ajaxObj = this.formatForApi(this.state.query);
  //   ApiCall(ajaxObj);
  // }

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
    console.log("What is our state", this.state.articles);
    return (
      <Container fluid>
        <Row>
          <Col size="md-5 sm-12">
            <h1 className='header'>Search New York Times</h1>
            <form className='search-form'>
              <div className="date-input">
              <div className='start-input'>
                <p>Start Date: (required)</p>
                <Date
                  onChange={this.onChange}
                  name="begin_date"
                />
                </div>
                <div className='end-input'>
                  <p>End Date: (required)</p>
                  <Date
                    onChange={this.onChange}
                    name="end_date" 
                  />
                </div>
              </div>
              <Input
                onChange={this.onChange}
                name="q"
                placeholder="Topic (required)"
                className='topic-input'
              />
              <FormBtn
                onClick={this.handleClick}
              >
                Search Articles
              </FormBtn>
            </form>
          </Col>
          <Col size="md-7 sm-12">
            <h1 className='header'>Search Results</h1>
            {this.state.searches.length > 0  ? (
            <List>
                {this.state.searches.map((search, i) => (
                  <ListItem key={i}>
                  <SaveBtn onClick={() => this.saveArticle(i)}/>
                    <a href={search.web_url}>
                      <h5 className="article-title">
                        {search.headline.main}
                      </h5>
                    </a>
                    <p>
                      <Moment 
                      format="MM/DD/YYYY HH:mm A"
                      date={search.pub_date} />
                    </p>
                    <p>{search.snippet}</p>
                    
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3 className='no-results'>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-8 sm-12" id='results-container'>
            <h1 className="header">Saved Articles</h1>
            {this.state.articles.length > 0  ? (
              <List>
                {this.state.articles.map((article) => (
                  <ListItem key={article._id}>
                  <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    <a href={article.web_url}>
                      <h5 className="article-title">
                        {article.headline_main}
                      </h5>
                    </a>
                    <p>
                      <Moment 
                      format="MM/DD/YYYY"
                      date={article.pub_date} />
                    </p>
                    <p className="description">{article.snippet}</p>
                    
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