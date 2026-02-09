import React, { useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllLessons } from '../data/lessons';
import { getSessionsForUser } from '../services/sessionStorage';
import { getUserCookie } from '../services/cookie';

const Home: React.FC = () => {
  const lessons = getAllLessons();
  const userName = getUserCookie() || '';
  const sessions = getSessionsForUser(userName);

  useEffect(() => {
    document.title = 'Typer Teacher - Home';
  }, []);

  return (
    <Container className="py-5" style={{ maxWidth: 720 }}>
      <h1 className="display-4 mb-3 text-center">Typer Teacher</h1>
      <p className="lead text-muted mb-4 text-center">
        Learn to touch-type, one key at a time. Pick a lesson below to get started.
      </p>

      <Row className="g-3 mb-5">
        {lessons.map((l) => (
          <Col xs={12} sm={6} md={4} key={l.id}>
            <Card className="h-100 border">
              <Card.Body>
                <Card.Title>Lesson {l.id}</Card.Title>
                <Card.Text className="text-muted">{l.title}</Card.Text>
                <Link to={`/lesson/${l.id}`} className="btn btn-outline-dark btn-sm">
                  Start
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {sessions.length > 0 && (
        <>
          <h3 className="mb-3">Your Recent Sessions</h3>
          <div className="table-responsive">
            <table className="table table-sm table-bordered" data-testid="session-table">
              <thead className="table-light">
                <tr>
                  <th>Lesson</th>
                  <th>Errors</th>
                  <th>Characters</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sessions.slice(-10).reverse().map((s) => (
                  <tr key={s.id}>
                    <td>{s.lessonTitle}</td>
                    <td>{s.errors}</td>
                    <td>{s.totalChars}</td>
                    <td>{new Date(s.completedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
