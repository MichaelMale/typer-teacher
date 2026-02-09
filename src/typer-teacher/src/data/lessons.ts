export interface Exercise {
  label: string;
  text: string;
}

export interface LessonData {
  id: number;
  title: string;
  description: string;
  exercises: Exercise[];
}

const lessons: LessonData[] = [
  {
    id: 1,
    title: 'Home Keys (F & J)',
    description:
      'Place your index fingers on F and J (the keys with bumps). Type each sequence as shown.',
    exercises: [
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
    ],
  },
  {
    id: 2,
    title: 'Home Row',
    description:
      'Keep your fingers on the home row: A S D F (left hand) and J K L ; (right hand). Type each sequence.',
    exercises: [
      { label: 'Step 1', text: 'asdf' },
      { label: 'Step 2', text: 'jkl;' },
      { label: 'Step 3', text: 'asdf jkl;' },
      { label: 'Step 4', text: 'fdsa ;lkj' },
      { label: 'Step 5', text: 'asd fjkl' },
      { label: 'Step 6', text: 'fall lads' },
      { label: 'Step 7', text: 'ask a lad' },
      { label: 'Step 8', text: 'salad flask' },
      { label: 'Step 9', text: 'a sad fall; a glad lass' },
      { label: 'Step 10', text: 'all lads shall ask dad' },
    ],
  },
  {
    id: 3,
    title: 'Basic Sentences',
    description:
      'Put it all together. Type these short sentences using the keys you have learned.',
    exercises: [
      { label: 'Step 1', text: 'the quick fox' },
      { label: 'Step 2', text: 'a dog sat down' },
      { label: 'Step 3', text: 'she sells sea shells' },
      { label: 'Step 4', text: 'he had a fall last fall' },
      { label: 'Step 5', text: 'jack and jill ran fast' },
      { label: 'Step 6', text: 'all good lads ask dad for a flask' },
      { label: 'Step 7', text: 'the sad dog sat all day long' },
      { label: 'Step 8', text: 'a glad lass shall dash ahead fast' },
      { label: 'Step 9', text: 'she had a salad and a glass of juice' },
      { label: 'Step 10', text: 'the quick brown fox jumps over the lazy dog' },
    ],
  },
];

export function getLesson(id: number): LessonData | undefined {
  return lessons.find((l) => l.id === id);
}

export function getAllLessons(): LessonData[] {
  return lessons;
}
