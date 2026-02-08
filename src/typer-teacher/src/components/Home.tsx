import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Typer Teacher - Home';
  }, []);

  return (
    <Container className="py-5 text-center" style={{ maxWidth: 640 }}>
      <h1 className="display-4 mb-3">Typer Teacher</h1>
      <p className="lead text-muted mb-4">
        Learn to touch-type, one key at a time. Start with the home row and build your skills step by step.
      </p>
      <Link to="/lesson/1" className="btn btn-outline-dark btn-lg">
        Start Lesson 1
      </Link>
    </Container>
  );
};

export default Home;
