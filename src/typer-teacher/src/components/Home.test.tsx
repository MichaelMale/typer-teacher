import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

describe('Home', () => {
  test('renders the heading', () => {
    renderHome();
    expect(screen.getByRole('heading', { name: /typer teacher/i })).toBeInTheDocument();
  });

  test('renders the description text', () => {
    renderHome();
    expect(screen.getByText(/learn to touch-type/i)).toBeInTheDocument();
  });

  test('renders a link to Lesson 1', () => {
    renderHome();
    const link = screen.getByRole('link', { name: /start lesson 1/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/lesson/1');
  });

  test('sets the document title', () => {
    renderHome();
    expect(document.title).toBe('Typer Teacher - Home');
  });
});
