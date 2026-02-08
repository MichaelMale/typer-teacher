import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Route, Link, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Home from './components/Home';
import About from './components/About';
import TypingLesson from './components/TypingLesson';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" variant="light" expand="sm" className="border-bottom">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-dark">
            Typer Teacher
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/lesson/1">
                <Nav.Link>Lesson 1</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/1" element={<TypingLesson />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
