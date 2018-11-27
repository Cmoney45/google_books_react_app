import React, { Component } from "react";
import { ViewBtn, SaveBtn } from "../components/Buttons";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import googleAPI from "../utils/googleAPI";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";


class Books extends Component {
    state = {
        books: [],
        priorSearch: "",
        title: ""
    };

    formatGoogleSearch = data => {
        const bookStateArray = [];

        data.items.forEach(item => {
            console.log(item);
            const info = item.volumeInfo;

            const dummyBookArray = {
                googleID: item.id,
                title: info.title,
                authors: info.authors,
                synopsis: info.description,
                image: info.imageLinks.thumbnail,
                link: info.infoLink,
                date: info.publishedDate
            };

            bookStateArray.push(dummyBookArray);
        })

        this.setState({ books: bookStateArray, title: "" })
    }


    saveBook = id => {
        API.saveBook(id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    searchBookButton = event => {
        event.preventDefault();
        this.searchBook();
    }

    searchBook = event => {
        event.preventDefault();

        googleAPI.searchBook(this.state.title)
            .then(res => this.formatGoogleSearch(res.data))
            .catch(err => console.log(err));
    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>(React) Google Books Search</h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        <form>
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Title (required)"
                            />
                            <FormBtn
                                disabled={!(this.state.title)}
                                onClick={this.searchBook}
                            >Search
                            </FormBtn>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
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
                                                        <SaveBtn onClick={() => this.saveBook(book)} />
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
                                <h3>Search for a book!</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Books;
