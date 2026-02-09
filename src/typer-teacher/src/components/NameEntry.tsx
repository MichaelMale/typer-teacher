import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

interface NameEntryProps {
  onSubmit: (name: string) => void;
}

const NameEntry: React.FC<NameEntryProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <Container className="py-5 text-center" style={{ maxWidth: 480 }}>
      <h1 className="display-5 mb-3">Welcome to Typer Teacher</h1>
      <p className="text-muted mb-4">
        Type your name below to start a session. Your progress will be saved.
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Your name"
            autoFocus
            size="lg"
          />
        </Form.Group>
        <Button
          type="submit"
          variant="outline-dark"
          size="lg"
          disabled={!name.trim()}
        >
          Start Typing
        </Button>
      </Form>
    </Container>
  );
};

export default NameEntry;
