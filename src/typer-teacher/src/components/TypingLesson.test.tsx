import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TypingLesson from './TypingLesson';

describe('TypingLesson', () => {
  test('renders the lesson heading', () => {
    render(<TypingLesson />);
    expect(screen.getByText(/Lesson 1: Home Keys/i)).toBeInTheDocument();
  });

  test('renders instruction text', () => {
    render(<TypingLesson />);
    expect(screen.getByText(/place your index fingers/i)).toBeInTheDocument();
  });

  test('shows "Start typing to begin..." before any input', () => {
    render(<TypingLesson />);
    expect(screen.getByText(/start typing to begin/i)).toBeInTheDocument();
  });

  test('renders the first exercise target text "f"', () => {
    render(<TypingLesson />);
    expect(screen.getByText(/Step 1 of 10/i)).toBeInTheDocument();
  });

  test('advances to next exercise after correct input', () => {
    render(<TypingLesson />);
    fireEvent.keyDown(window, { key: 'f' });
    expect(screen.getByText(/Step 2 of 10/i)).toBeInTheDocument();
  });

  test('increments error count on wrong key', () => {
    render(<TypingLesson />);
    fireEvent.keyDown(window, { key: 'x' });
    expect(screen.getByTestId('error-count')).toHaveTextContent('Errors: 1');
  });

  test('does not advance on wrong key', () => {
    render(<TypingLesson />);
    fireEvent.keyDown(window, { key: 'x' });
    expect(screen.getByText(/Step 1 of 10/i)).toBeInTheDocument();
  });

  test('progresses through multiple exercises', () => {
    render(<TypingLesson />);
    // Exercise 1: 'f'
    fireEvent.keyDown(window, { key: 'f' });
    // Exercise 2: 'j'
    fireEvent.keyDown(window, { key: 'j' });
    // Exercise 3: 'fj'
    fireEvent.keyDown(window, { key: 'f' });
    fireEvent.keyDown(window, { key: 'j' });
    // Now at exercise 4
    expect(screen.getByText(/Step 4 of 10/i)).toBeInTheDocument();
  });

  test('shows completion message after all exercises', () => {
    render(<TypingLesson />);
    const sequences = ['f', 'j', 'fj', 'jf', 'fjfj', 'jfjf', 'fjfjfj', 'jfjfjf', 'fjfjfjfjfj', 'fjfjfjfjfjfjfjfjfjfjfjfj'];
    for (const seq of sequences) {
      for (const char of seq) {
        fireEvent.keyDown(window, { key: char });
      }
    }
    expect(screen.getByText(/Lesson Complete!/i)).toBeInTheDocument();
  });

  test('shows restart button after completion', () => {
    render(<TypingLesson />);
    const sequences = ['f', 'j', 'fj', 'jf', 'fjfj', 'jfjf', 'fjfjfj', 'jfjfjf', 'fjfjfjfjfj', 'fjfjfjfjfjfjfjfjfjfjfjfj'];
    for (const seq of sequences) {
      for (const char of seq) {
        fireEvent.keyDown(window, { key: char });
      }
    }
    expect(screen.getByRole('button', { name: /restart lesson/i })).toBeInTheDocument();
  });

  test('restart button resets the lesson', () => {
    render(<TypingLesson />);
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

  test('ignores modifier keys', () => {
    render(<TypingLesson />);
    fireEvent.keyDown(window, { key: 'Shift' });
    fireEvent.keyDown(window, { key: 'Control' });
    fireEvent.keyDown(window, { key: 'Alt' });
    fireEvent.keyDown(window, { key: 'Tab' });
    // Should still be on step 1 with no errors
    expect(screen.getByText(/Step 1 of 10/i)).toBeInTheDocument();
    expect(screen.queryByTestId('error-count')).not.toBeInTheDocument();
  });

  test('displays error count of 0 errors at completion when no mistakes', () => {
    render(<TypingLesson />);
    const sequences = ['f', 'j', 'fj', 'jf', 'fjfj', 'jfjf', 'fjfjfj', 'jfjfjf', 'fjfjfjfjfj', 'fjfjfjfjfjfjfjfjfjfjfjfj'];
    for (const seq of sequences) {
      for (const char of seq) {
        fireEvent.keyDown(window, { key: char });
      }
    }
    expect(screen.getByText(/you finished with/i)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
