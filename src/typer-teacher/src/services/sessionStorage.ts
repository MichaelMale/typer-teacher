const STORAGE_KEY = 'typer-teacher-sessions';

export interface TypingSession {
  id: string;
  userName: string;
  lessonId: number;
  lessonTitle: string;
  errors: number;
  totalChars: number;
  durationMs: number;
  completedAt: string;
}

export function getSessions(): TypingSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getSessionsForUser(userName: string): TypingSession[] {
  return getSessions().filter(
    (s) => s.userName.toLowerCase() === userName.toLowerCase()
  );
}

export function saveSession(session: Omit<TypingSession, 'id' | 'completedAt'>): TypingSession {
  const sessions = getSessions();
  const newSession: TypingSession = {
    ...session,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    completedAt: new Date().toISOString(),
  };
  sessions.push(newSession);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  return newSession;
}

export function clearSessions(): void {
  localStorage.removeItem(STORAGE_KEY);
}
