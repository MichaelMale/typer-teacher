import { setUserCookie, getUserCookie, clearUserCookie } from './cookie';

afterEach(() => {
  clearUserCookie();
});

describe('cookie service', () => {
  test('getUserCookie returns null when no cookie set', () => {
    expect(getUserCookie()).toBeNull();
  });

  test('setUserCookie and getUserCookie round-trip', () => {
    setUserCookie('Alice');
    expect(getUserCookie()).toBe('Alice');
  });

  test('handles names with special characters', () => {
    setUserCookie('O\'Brien & Co');
    expect(getUserCookie()).toBe('O\'Brien & Co');
  });

  test('clearUserCookie removes the cookie', () => {
    setUserCookie('Alice');
    clearUserCookie();
    expect(getUserCookie()).toBeNull();
  });
});
