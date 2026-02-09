import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Route, Link, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Home from './components/Home';
import About from './components/About';
import TypingLesson from './components/TypingLesson';
import NameEntry from './components/NameEntry';
import { getUserCookie, setUserCookie, clearUserCookie } from './services/cookie';
import { getAllLessons } from './data/lessons';
import './App.css';

function App() {
  const [userName, setUserName] = useState<string | null>(getUserCookie());
  const lessons = getAllLessons();

  useEffect(() => {
    setUserName(getUserCookie());
  }, []);

  const handleNameSubmit = (name: string) => {
    setUserCookie(name);
    setUserName(name);
  };

  const handleLogout = () => {
    clearUserCookie();
    setUserName(null);
  };

  if (!userName) {
    return <NameEntry onSubmit={handleNameSubmit} />;
  }

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
              <NavDropdown title="Lessons" id="lessons-dropdown">
                {lessons.map((l) => (
                  <LinkContainer key={l.id} to={`/lesson/${l.id}`}>
                    <NavDropdown.Item>
                      Lesson {l.id}: {l.title}
                    </NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <Navbar.Text className="me-2">
                Hi, <strong>{userName}</strong>
              </Navbar.Text>
              <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:id" element={<TypingLesson />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
