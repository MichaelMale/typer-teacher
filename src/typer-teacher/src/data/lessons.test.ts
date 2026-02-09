import { getLesson, getAllLessons } from './lessons';

describe('lessons data', () => {
  test('getAllLessons returns 3 lessons', () => {
    expect(getAllLessons()).toHaveLength(3);
  });

  test('getLesson(1) returns lesson 1', () => {
    const lesson = getLesson(1);
    expect(lesson).toBeDefined();
    expect(lesson!.title).toContain('Home Keys');
    expect(lesson!.exercises).toHaveLength(10);
  });

  test('getLesson(2) returns lesson 2', () => {
    const lesson = getLesson(2);
    expect(lesson).toBeDefined();
    expect(lesson!.title).toContain('Home Row');
    expect(lesson!.exercises).toHaveLength(10);
  });

  test('getLesson(3) returns lesson 3', () => {
    const lesson = getLesson(3);
    expect(lesson).toBeDefined();
    expect(lesson!.title).toContain('Basic Sentences');
    expect(lesson!.exercises).toHaveLength(10);
  });

  test('getLesson returns undefined for unknown id', () => {
    expect(getLesson(999)).toBeUndefined();
  });

  test('each lesson has unique ids', () => {
    const ids = getAllLessons().map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('each exercise has a label and non-empty text', () => {
    for (const lesson of getAllLessons()) {
      for (const ex of lesson.exercises) {
        expect(ex.label).toBeTruthy();
        expect(ex.text.length).toBeGreaterThan(0);
      }
    }
  });
});
