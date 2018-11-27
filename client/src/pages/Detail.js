import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { TextArea, FormBtn } from "../components/Form"
import API from "../utils/API";

class Detail extends Component {
  state = {
    book: {},
    comment: ""
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  // When this component mounts, grab the book with the _id of this.props.match.params.id
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-2">
            <Link to="/books">← Back to all books</Link>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <Row>
                <Col size="sm-2">
                  <img src={this.state.book.image}></img>

                </Col>
                <Col size="md-8 sm-12">
                  <h1>
                    {this.state.book.title}
                  </h1>
                  <h2>
                    by {this.state.book.authors}
                  </h2>
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h3>Synopsis</h3>
              <p>
                {this.state.book.synopsis}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          {this.state.book.note ? (
            <div>
              {this.state.book.note.map(note => (
                <div>{this.state.book.note}</div>
              ))}
            </div>
          ) : (
              <div>
                <h3>No comments on this books</h3>
              </div>
            )}
        </Row>
        <Row>
          <Col size="md-6">
            <form>
              <TextArea
                value={this.state.comment}
                onChange={this.handleInputChange}
                name="comment"
                placeholder="Enter comment here"
              >
              </TextArea>
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >Submit Comment
            </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
