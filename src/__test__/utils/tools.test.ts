import { expect, test } from 'vitest';
import { QueryString, formatMenu } from '@/utils/tools';

test('queryString', () => {
  expect(QueryString('name', '?name=test')).toBe('test');
});

test('formatMenu', async () => {
  const menu1 = [
    { parent_id: 0, id: 1 },
    { parent_id: 1, id: 2 },
  ];
  const menu2 = [
    { parent_id: 0, id: 1, hasChildren: true },
    { parent_id: 1, id: 2 },
  ];
  expect(formatMenu(menu1)).toMatchObject(menu2);
});
