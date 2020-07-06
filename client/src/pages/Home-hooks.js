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
  const [books, setBooks] = useState({
    gooBooks: [],
    q: "",
    message: "Search For A Book To Begin!"
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setBooks({
      ...gooBooks,
      [name]: value
    });
  }

  function getBooks() {
    API.getBooks(books.q)
      .then((res) =>
        setBooks({
          ...gooBooks,
          ...res.data
        })
      )
      .catch(() =>
        setBooks({
          ...gooBooks,
          gooBooks: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    getBooks();
  }

  function handleBookSave(id) {
    const book = books.find((book) => book.id === id);

    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
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
              q={books.q}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <Card title="Results">
            {books.gooBooks.length ? (
              <List>
                {books.gooBooks.map((book) => (
                  <Book
                    key={book.id}
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.subtitle}
                    link={book.volumeInfo.infoLink}
                    authors={book.volumeInfo.authors.join(", ")}
                    description={book.volumeInfo.description}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    Button={() => (
                      <button
                        onClick={() => handlebooks.ave(book.id)}
                        className="btn btn-primary ml-2"
                      >
                        Save
                      </button>
                    )}
                  />
                ))}
              </List>
            ) : (
              <h2 className="text-center">{books.message}</h2>
            )}
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default Home;
