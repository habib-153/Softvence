export const STATUS = ['pending', 'ongoing', 'done', 'collaborative-task'];

export type TStatus = 'pending' | 'ongoing' | 'done' | 'collaborative-task';

export const CATEGORIES = [
  'arts-and-craft',
  'nature',
  'family',
  'sport',
  'meditation',
  'friends',
];
export type TCategory = 'arts-and-craft' | 'nature' | 'family' | 'sport' | 'meditation' | 'friends';

export const postSearchableFields = ['title', 'category'];
