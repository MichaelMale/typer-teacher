import React, { useState, useEffect, useCallback } from 'react';
import { Container, ProgressBar, Alert } from 'react-bootstrap';

interface Exercise {
  label: string;
  text: string;
}

const EXERCISES: Exercise[] = [
  { label: 'Step 1', text: 'f' },
  { label: 'Step 2', text: 'j' },
  { label: 'Step 3', text: 'fj' },
  { label: 'Step 4', text: 'jf' },
  { label: 'Step 5', text: 'fjfj' },
  { label: 'Step 6', text: 'jfjf' },
  { label: 'Step 7', text: 'fjfjfj' },
  { label: 'Step 8', text: 'jfjfjf' },
  { label: 'Step 9', text: 'fjfjfjfjfj' },
  { label: 'Step 10', text: 'fjfjfjfjfjfjfjfjfjfjfjfj' },
];

const TypingLesson: React.FC = () => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);

  const currentExercise = EXERCISES[exerciseIndex];
  const targetText = currentExercise?.text ?? '';

  useEffect(() => {
    document.title = 'Typer Teacher - Lesson 1: Home Keys (F & J)';
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (completed) return;
      if (e.key === 'Tab' || e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') return;

      e.preventDefault();

      if (!started) setStarted(true);

      const expectedChar = targetText[typedText.length];

      if (e.key === expectedChar) {
        const newTyped = typedText + e.key;
        setTypedText(newTyped);

        if (newTyped === targetText) {
          if (exerciseIndex < EXERCISES.length - 1) {
            setExerciseIndex((prev) => prev + 1);
            setTypedText('');
          } else {
            setCompleted(true);
          }
        }
      } else {
        setErrors((prev) => prev + 1);
      }
    },
    [typedText, targetText, exerciseIndex, completed, started]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const restart = () => {
    setExerciseIndex(0);
    setTypedText('');
    setErrors(0);
    setCompleted(false);
    setStarted(false);
  };

  const overallProgress = Math.round(
    ((exerciseIndex + (typedText.length / (targetText.length || 1))) / EXERCISES.length) * 100
  );

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <h1 className="mb-3">Lesson 1: Home Keys (F &amp; J)</h1>
      <p className="text-muted mb-4">
        Place your index fingers on <strong>F</strong> and <strong>J</strong> (the keys with bumps). Type each sequence as shown below.
      </p>

      <ProgressBar
        now={completed ? 100 : overallProgress}
        label={completed ? 'Complete!' : `${overallProgress}%`}
        className="mb-4"
        variant="secondary"
        aria-label="Lesson progress"
      />

      {completed ? (
        <Alert variant="success" className="text-center">
          <Alert.Heading>Lesson Complete!</Alert.Heading>
          <p>You finished with <strong>{errors}</strong> error{errors !== 1 ? 's' : ''}.</p>
          <button className="btn btn-outline-secondary" onClick={restart}>
            Restart Lesson
          </button>
        </Alert>
      ) : (
        <div className="lesson-area p-4 rounded" data-testid="lesson-area">
          <h5 className="text-muted mb-2">
            {currentExercise.label} of {EXERCISES.length}
          </h5>
          <div
            className="target-text mb-3"
            style={{ fontSize: '2rem', fontFamily: 'monospace', letterSpacing: '0.15em' }}
            aria-label={`Type: ${targetText}`}
          >
            {targetText.split('').map((char, i) => {
              let className = 'text-muted';
              if (i < typedText.length) {
                className = 'text-dark';
              } else if (i === typedText.length) {
                className = 'current-char';
              }
              return (
                <span key={i} className={className} data-testid={`char-${i}`}>
                  {char}
                </span>
              );
            })}
          </div>
          {!started && (
            <p className="text-muted fst-italic">Start typing to begin...</p>
          )}
          {errors > 0 && (
            <p className="text-danger mt-2" data-testid="error-count">
              Errors: {errors}
            </p>
          )}
        </div>
      )}
    </Container>
  );
};

export default TypingLesson;
