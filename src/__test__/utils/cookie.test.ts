import { expect, test } from 'vitest';
import { getCookie, setCookie, removeCookie } from '@/utils/cookie';
test('set cookie,get cookie', () => {
  expect(setCookie('testCookie', 'testCookie'));
  expect(getCookie('testCookie')).toBe('testCookie');
});
test('removeCookie', () => {
  expect(getCookie('testCookie')).toBe('testCookie');
  expect(removeCookie('testCookie'));
  expect(getCookie('testCookie')).toBe(undefined);
});
