import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import * as cookie from './services/cookie';

// Helper: set user cookie before rendering so App shows the main UI
const renderApp = (route = '/') => {
  cookie.setUserCookie('TestUser');
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
};

afterEach(() => {
  cookie.clearUserCookie();
});

describe('App (logged in)', () => {
  test('renders the navbar with brand name', () => {
    renderApp();
    const brands = screen.getAllByText('Typer Teacher');
    expect(brands.length).toBeGreaterThanOrEqual(1);
  });

  test('renders navigation links', () => {
    renderApp();
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument();
  });

  test('renders lessons dropdown', () => {
    renderApp();
    expect(screen.getByText('Lessons')).toBeInTheDocument();
  });

  test('displays the user name in the navbar', () => {
    renderApp();
    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });

  test('renders the Home page at /', () => {
    renderApp('/');
    expect(screen.getByText(/pick a lesson/i)).toBeInTheDocument();
  });

  test('renders the About page at /about', () => {
    renderApp('/about');
    expect(screen.getByText('About Page')).toBeInTheDocument();
  });

  test('renders Lesson 1 at /lesson/1', () => {
    renderApp('/lesson/1');
    expect(screen.getByText(/Lesson 1: Home Keys/i)).toBeInTheDocument();
  });

  test('renders Lesson 2 at /lesson/2', () => {
    renderApp('/lesson/2');
    expect(screen.getByText(/Lesson 2: Home Row/i)).toBeInTheDocument();
  });

  test('renders Lesson 3 at /lesson/3', () => {
    renderApp('/lesson/3');
    expect(screen.getByText(/Lesson 3: Basic Sentences/i)).toBeInTheDocument();
  });
});

describe('App (not logged in)', () => {
  test('shows the name entry screen when no cookie is set', () => {
    cookie.clearUserCookie();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/welcome to typer teacher/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
  });

  test('submitting a name shows the main app', () => {
    cookie.clearUserCookie();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/your name/i), {
      target: { value: 'Alice' },
    });
    fireEvent.click(screen.getByRole('button', { name: /start typing/i }));
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
