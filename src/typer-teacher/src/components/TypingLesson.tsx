import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, ProgressBar, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getLesson, LessonData } from '../data/lessons';
import { saveSession } from '../services/sessionStorage';
import { getUserCookie } from '../services/cookie';

const TypingLesson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const lessonId = Number(id) || 1;
  const lesson: LessonData | undefined = getLesson(lessonId);

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);
  const [saved, setSaved] = useState(false);
  const startTimeRef = useRef<number>(0);

  const exercises = lesson?.exercises ?? [];
  const currentExercise = exercises[exerciseIndex];
  const targetText = currentExercise?.text ?? '';

  useEffect(() => {
    document.title = lesson
      ? `Typer Teacher - Lesson ${lesson.id}: ${lesson.title}`
      : 'Typer Teacher - Lesson Not Found';
  }, [lesson]);

  // Reset state when lesson id changes
  useEffect(() => {
    setExerciseIndex(0);
    setTypedText('');
    setErrors(0);
    setCompleted(false);
    setStarted(false);
    setSaved(false);
    startTimeRef.current = 0;
  }, [lessonId]);

  // Save session once on completion
  useEffect(() => {
    if (completed && !saved && lesson) {
      const userName = getUserCookie() || 'Anonymous';
      const totalChars = exercises.reduce((sum, ex) => sum + ex.text.length, 0);
      const durationMs = Date.now() - startTimeRef.current;
      saveSession({
        userName,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        errors,
        totalChars,
        durationMs,
      });
      setSaved(true);
    }
  }, [completed, saved, lesson, exercises, errors]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (completed) return;
      if (['Tab', 'Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;

      e.preventDefault();

      if (!started) {
        setStarted(true);
        startTimeRef.current = Date.now();
      }

      const expectedChar = targetText[typedText.length];

      if (e.key === expectedChar) {
        const newTyped = typedText + e.key;
        setTypedText(newTyped);

        if (newTyped === targetText) {
          if (exerciseIndex < exercises.length - 1) {
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
    [typedText, targetText, exerciseIndex, exercises.length, completed, started]
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
    setSaved(false);
    startTimeRef.current = 0;
  };

  if (!lesson) {
    return (
      <Container className="py-5 text-center">
        <h1>Lesson not found</h1>
        <Link to="/" className="btn btn-outline-dark mt-3">
          Back to Home
        </Link>
      </Container>
    );
  }

  const overallProgress = Math.round(
    ((exerciseIndex + (typedText.length / (targetText.length || 1))) / exercises.length) * 100
  );

  const nextLessonId = lessonId + 1;
  const hasNextLesson = !!getLesson(nextLessonId);

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <h1 className="mb-3">Lesson {lesson.id}: {lesson.title}</h1>
      <p className="text-muted mb-4">{lesson.description}</p>

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
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-outline-secondary" onClick={restart}>
              Restart Lesson
            </button>
            {hasNextLesson && (
              <Link to={`/lesson/${nextLessonId}`} className="btn btn-outline-dark">
                Next Lesson
              </Link>
            )}
          </div>
        </Alert>
      ) : (
        <div className="lesson-area p-4 rounded" data-testid="lesson-area">
          <h5 className="text-muted mb-2">
            {currentExercise.label} of {exercises.length}
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
                  {char === ' ' ? '\u00A0' : char}
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
