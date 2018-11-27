import React, { Component } from "react";
import { ViewBtn, DeleteBtn } from "../components/Buttons"
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Books extends Component {
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: ""
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
            .then(res =>
                this.setState({ books: res.data, title: "", author: "", synopsis: "" })
            )
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };

    viewBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
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

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>(React) Google Books Search</h1>
                        </Jumbotron>
                        {this.state.books.length ? (
                            <List>
                            {this.state.books.map(book => (
                                <ListItem key={book.googleID}>
                                    <Row>
                                        <Col size="md-1">
                                            <img src={book.image} alt={book.title}></img>
                                        </Col>
                                        <Col size="md-11 sm-12">
                                            <Row>
                                                <Col size="md-6 sm-12">
                                                    <a href={book.link} target="_blank">
                                                        <strong>
                                                            {book.title}
                                                        </strong>
                                                    </a>
                                                </Col>
                                                <Col size="md-6 sm-12">
                                                <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                                    <a href={book.link} target="_blank">
                                                        <ViewBtn />
                                                    </a>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col size="md-12">
                                                    <strong>by {book.authors}</strong>
                                                    <p>{book.synopsis}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </ListItem>
                                ))}
                            </List>
                        ) : (
                                <div>
                                    <h3>No Saved books to Display</h3>
                                    <h3>Go Save some!</h3>
                                </div>

                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Books;
