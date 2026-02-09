import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TypingLesson from './TypingLesson';
import * as sessionStorage from '../services/sessionStorage';

const renderLesson = (lessonId: number = 1) =>
  render(
    <MemoryRouter initialEntries={[`/lesson/${lessonId}`]}>
      <Routes>
        <Route path="/lesson/:id" element={<TypingLesson />} />
      </Routes>
    </MemoryRouter>
  );

afterEach(() => {
  sessionStorage.clearSessions();
});

describe('TypingLesson - Lesson 1', () => {
  test('renders the lesson heading', () => {
    renderLesson(1);
    expect(screen.getByText(/Lesson 1: Home Keys/i)).toBeInTheDocument();
  });

  test('renders instruction text', () => {
    renderLesson(1);
    expect(screen.getByText(/Place your index fingers/i)).toBeInTheDocument();
  });

  test('shows "Start typing to begin..." before any input', () => {
    renderLesson(1);
    expect(screen.getByText(/start typing to begin/i)).toBeInTheDocument();
  });

  test('renders the first exercise step', () => {
    renderLesson(1);
    expect(screen.getByText(/Step 1 of 10/i)).toBeInTheDocument();
  });

  test('advances to next exercise after correct input', () => {
    renderLesson(1);
    fireEvent.keyDown(window, { key: 'f' });
    expect(screen.getByText(/Step 2 of 10/i)).toBeInTheDocument();
  });

  test('increments error count on wrong key', () => {
    renderLesson(1);
    fireEvent.keyDown(window, { key: 'x' });
    expect(screen.getByTestId('error-count')).toHaveTextContent('Errors: 1');
  });

  test('does not advance on wrong key', () => {
    renderLesson(1);
    fireEvent.keyDown(window, { key: 'x' });
    expect(screen.getByText(/Step 1 of 10/i)).toBeInTheDocument();
  });

  test('ignores modifier keys', () => {
    renderLesson(1);
    fireEvent.keyDown(window, { key: 'Shift' });
    fireEvent.keyDown(window, { key: 'Control' });
    fireEvent.keyDown(window, { key: 'Alt' });
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(screen.getByText(/Step 1 of 10/i)).toBeInTheDocument();
    expect(screen.queryByTestId('error-count')).not.toBeInTheDocument();
  });

  test('shows completion message after all exercises', () => {
    renderLesson(1);
    const sequences = ['f', 'j', 'fj', 'jf', 'fjfj', 'jfjf', 'fjfjfj', 'jfjfjf', 'fjfjfjfjfj', 'fjfjfjfjfjfjfjfjfjfjfjfj'];
    for (const seq of sequences) {
      for (const char of seq) {
        fireEvent.keyDown(window, { key: char });
      }
    }
    expect(screen.getByText(/Lesson Complete!/i)).toBeInTheDocument();
  });

  test('shows Next Lesson button after completing lesson 1', () => {
    renderLesson(1);
    const sequences = ['f', 'j', 'fj', 'jf', 'fjfj', 'jfjf', 'fjfjfj', 'jfjfjf', 'fjfjfjfjfj', 'fjfjfjfjfjfjfjfjfjfjfjfj'];
    for (const seq of sequences) {
      for (const char of seq) {
        fireEvent.keyDown(window, { key: char });
      }
    }
    expect(screen.getByRole('link', { name: /next lesson/i })).toHaveAttribute('href', '/lesson/2');
  });

  test('restart button resets the lesson', () => {
    renderLesson(1);
    const sequences = ['f', 'j', 'fj', 'jf', 'fjfj', 'jfjf', 'fjfjfj', 'jfjfjf', 'fjfjfjfjfj', 'fjfjfjfjfjfjfjfjfjfjfjfj'];
    for (const seq of sequences) {
      for (const char of seq) {
        fireEvent.keyDown(window, { key: char });
      }
    }
    fireEvent.click(screen.getByRole('button', { name: /restart lesson/i }));
    expect(screen.getByText(/Step 1 of 10/i)).toBeInTheDocument();
    expect(screen.getByText(/start typing to begin/i)).toBeInTheDocument();
  });

  test('saves session to localStorage on completion', () => {
    renderLesson(1);
    const sequences = ['f', 'j', 'fj', 'jf', 'fjfj', 'jfjf', 'fjfjfj', 'jfjfjf', 'fjfjfjfjfj', 'fjfjfjfjfjfjfjfjfjfjfjfj'];
    for (const seq of sequences) {
      for (const char of seq) {
        fireEvent.keyDown(window, { key: char });
      }
    }
    const sessions = sessionStorage.getSessions();
    expect(sessions).toHaveLength(1);
    expect(sessions[0].lessonId).toBe(1);
    expect(sessions[0].errors).toBe(0);
  });
});

describe('TypingLesson - Lesson 2', () => {
  test('renders lesson 2 heading', () => {
    renderLesson(2);
    expect(screen.getByText(/Lesson 2: Home Row/i)).toBeInTheDocument();
  });

  test('renders lesson 2 description', () => {
    renderLesson(2);
    expect(screen.getByText(/Keep your fingers on the home row/i)).toBeInTheDocument();
  });

  test('first exercise is "asdf"', () => {
    renderLesson(2);
    expect(screen.getByText(/Step 1 of 10/i)).toBeInTheDocument();
    // Type 'a' to advance
    fireEvent.keyDown(window, { key: 'a' });
    fireEvent.keyDown(window, { key: 's' });
    fireEvent.keyDown(window, { key: 'd' });
    fireEvent.keyDown(window, { key: 'f' });
    expect(screen.getByText(/Step 2 of 10/i)).toBeInTheDocument();
  });
});

describe('TypingLesson - Lesson 3', () => {
  test('renders lesson 3 heading', () => {
    renderLesson(3);
    expect(screen.getByText(/Lesson 3: Basic Sentences/i)).toBeInTheDocument();
  });

  test('first exercise contains spaces', () => {
    renderLesson(3);
    // "the quick fox" - type first few chars
    fireEvent.keyDown(window, { key: 't' });
    fireEvent.keyDown(window, { key: 'h' });
    fireEvent.keyDown(window, { key: 'e' });
    fireEvent.keyDown(window, { key: ' ' });
    // Still on step 1, partially typed
    expect(screen.getByText(/Step 1 of 10/i)).toBeInTheDocument();
  });
});

describe('TypingLesson - invalid lesson', () => {
  test('shows "Lesson not found" for invalid id', () => {
    renderLesson(999);
    expect(screen.getByText(/lesson not found/i)).toBeInTheDocument();
  });
});
