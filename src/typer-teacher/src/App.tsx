import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Route, Link, Routes } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          Typer Teacher
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>User Guide</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <NavDropdown title="Lessons" id="nav-dropdown">
              <NavDropdown.Item eventKey="1">Introduction</NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
