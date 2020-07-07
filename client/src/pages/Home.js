import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("Search For A Book To Begin!");

  function handleInputChange(event) {
    const { value } = event.target;
    console.log("Home - handleInputChange - value", value);
    // ADD CODE TO MODIFY THE STATEFUL QUERY WITH VALUE
    setQuery(value);
  }

  function getBooks() {
    API.getBooks(query)
      .then((res) => {
        // ADD CODE TO MODIFY STATEFUL BOOKS WITH RES.DATA
        setBooks(res.data);
      })
      .catch(() => {
        setBooks([]);
        setMessage("No New Books Found, Try a Different Query");
      });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    getBooks();
  }

  function handleBookSave(id) {
    const book = books.find((book) => book.id === id);
    console.log("handleBookSave - id", id);
    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
    }).then(() => getBooks());
  }

  return (
    <Container>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1 className="text-center">
              <strong>(React) Google Books Search</strong>
            </h1>
            <h2 className="text-center">
              Search for and Save Books of Interest.
            </h2>
          </Jumbotron>
        </Col>
        <Col size="md-12">
          <Card title="Book Search" icon="far fa-book">
            <Form
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              query={query}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <Card title="Results">
            {books.length ? (
              <List>
                {books.map((book) => (
                  <Book
                    key={book.id}
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.subtitle}
                    link={book.volumeInfo.infoLink}
                    authors={book.volumeInfo.authors.join(", ")}
                    description={book.volumeInfo.description}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    // ADD ATTRIBUTE op AND ASSIGN "save" TO IT
                    op="save"
                    // ADD ATTRIBUTE bookId AND ASSIGN book.id to it
                    bookId={book.id}
                    // ADD ATTRIBUTE handleBookCallBack and ASSIGN handleBookSave CALLBACK TO IT
                    handleBookCallBack={handleBookSave}
                  />
                ))}
              </List>
            ) : (
              <h2 className="text-center">{message}</h2>
            )}
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default Home;
