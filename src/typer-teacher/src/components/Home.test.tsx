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

  test('renders lesson cards for all 3 lessons', () => {
    renderHome();
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
    expect(screen.getByText('Lesson 2')).toBeInTheDocument();
    expect(screen.getByText('Lesson 3')).toBeInTheDocument();
  });

  test('renders Start links for each lesson', () => {
    renderHome();
    const startLinks = screen.getAllByRole('link', { name: /start/i });
    expect(startLinks).toHaveLength(3);
    expect(startLinks[0]).toHaveAttribute('href', '/lesson/1');
    expect(startLinks[1]).toHaveAttribute('href', '/lesson/2');
    expect(startLinks[2]).toHaveAttribute('href', '/lesson/3');
  });

  test('sets the document title', () => {
    renderHome();
    expect(document.title).toBe('Typer Teacher - Home');
  });
});
