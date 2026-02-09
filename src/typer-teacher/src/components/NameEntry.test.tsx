import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NameEntry from './NameEntry';

describe('NameEntry', () => {
  test('renders the welcome heading', () => {
    render(<NameEntry onSubmit={jest.fn()} />);
    expect(screen.getByText(/welcome to typer teacher/i)).toBeInTheDocument();
  });

  test('renders the name input', () => {
    render(<NameEntry onSubmit={jest.fn()} />);
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
  });

  test('submit button is disabled when input is empty', () => {
    render(<NameEntry onSubmit={jest.fn()} />);
    expect(screen.getByRole('button', { name: /start typing/i })).toBeDisabled();
  });

  test('submit button is enabled when input has text', () => {
    render(<NameEntry onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/your name/i), {
      target: { value: 'Bob' },
    });
    expect(screen.getByRole('button', { name: /start typing/i })).toBeEnabled();
  });

  test('calls onSubmit with trimmed name', () => {
    const onSubmit = jest.fn();
    render(<NameEntry onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText(/your name/i), {
      target: { value: '  Alice  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: /start typing/i }));
    expect(onSubmit).toHaveBeenCalledWith('Alice');
  });

  test('does not call onSubmit with only whitespace', () => {
    const onSubmit = jest.fn();
    render(<NameEntry onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText(/your name/i), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByRole('button', { name: /start typing/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
