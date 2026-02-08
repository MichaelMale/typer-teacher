import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderApp = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );

describe('App', () => {
  test('renders the navbar with brand name', () => {
    renderApp();
    const brands = screen.getAllByText('Typer Teacher');
    expect(brands.length).toBeGreaterThanOrEqual(1);
  });

  test('renders navigation links', () => {
    renderApp();
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^lesson 1$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument();
  });

  test('renders the Home page at /', () => {
    renderApp('/');
    expect(screen.getByText('Start Lesson 1')).toBeInTheDocument();
  });

  test('renders the About page at /about', () => {
    renderApp('/about');
    expect(screen.getByText('About Page')).toBeInTheDocument();
  });

  test('renders the Lesson page at /lesson/1', () => {
    renderApp('/lesson/1');
    expect(screen.getByText(/Lesson 1: Home Keys/i)).toBeInTheDocument();
  });
});
