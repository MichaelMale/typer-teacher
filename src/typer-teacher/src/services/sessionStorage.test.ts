import { getSessions, getSessionsForUser, saveSession, clearSessions } from './sessionStorage';

afterEach(() => {
  clearSessions();
});

describe('sessionStorage service', () => {
  test('getSessions returns empty array initially', () => {
    expect(getSessions()).toEqual([]);
  });

  test('saveSession adds a session', () => {
    saveSession({
      userName: 'Alice',
      lessonId: 1,
      lessonTitle: 'Home Keys',
      errors: 3,
      totalChars: 50,
      durationMs: 10000,
    });
    const sessions = getSessions();
    expect(sessions).toHaveLength(1);
    expect(sessions[0].userName).toBe('Alice');
    expect(sessions[0].lessonId).toBe(1);
    expect(sessions[0].errors).toBe(3);
    expect(sessions[0].id).toBeDefined();
    expect(sessions[0].completedAt).toBeDefined();
  });

  test('saveSession appends multiple sessions', () => {
    saveSession({ userName: 'A', lessonId: 1, lessonTitle: 'L1', errors: 0, totalChars: 10, durationMs: 1000 });
    saveSession({ userName: 'B', lessonId: 2, lessonTitle: 'L2', errors: 1, totalChars: 20, durationMs: 2000 });
    expect(getSessions()).toHaveLength(2);
  });

  test('getSessionsForUser filters by name (case-insensitive)', () => {
    saveSession({ userName: 'Alice', lessonId: 1, lessonTitle: 'L1', errors: 0, totalChars: 10, durationMs: 1000 });
    saveSession({ userName: 'Bob', lessonId: 1, lessonTitle: 'L1', errors: 0, totalChars: 10, durationMs: 1000 });
    saveSession({ userName: 'alice', lessonId: 2, lessonTitle: 'L2', errors: 1, totalChars: 20, durationMs: 2000 });
    expect(getSessionsForUser('Alice')).toHaveLength(2);
    expect(getSessionsForUser('bob')).toHaveLength(1);
  });

  test('clearSessions removes all sessions', () => {
    saveSession({ userName: 'A', lessonId: 1, lessonTitle: 'L1', errors: 0, totalChars: 10, durationMs: 1000 });
    clearSessions();
    expect(getSessions()).toEqual([]);
  });
});
