import { describe, expect, beforeEach, test } from 'vitest';
import { setActivePinia } from 'pinia';
import pinia, { GlobalStore } from '@/stores';
describe('1.store testing', () => {
  beforeEach(() => {
    setActivePinia(pinia);
  });
  test('1.Store setUserInfo', async () => {
    const store = GlobalStore();
    await store.setUserInfo({ serverInfo: { serverArea: 'asia' } });
    expect(store.userInfo.serverInfo.serverArea).toBe('asia');
  });
  test('2.Store setStoreId', async () => {
    const store = GlobalStore();
    await store.setStoreId('123');
    expect(store.storeId).toBe('123');
  });
  test('3.Store setLanguage', async () => {
    const store = GlobalStore();
    await store.setLanguage('nl_NL');
    expect(store.language).toBe('nl_NL');
  });
  test('4.Store setBuCode', async () => {
    const store = GlobalStore();
    await store.setBuCode('WTCHK');
    expect(store.buCode).toBe('WTCHK');
  });
  test('4.Store setMultipleMatches', async () => {
    const store = GlobalStore();
    await store.setMultipleMatches([{ name: '1' }, { name: '2' }]);
    expect(store.multipleMatches).toMatchObject([{ name: '1' }, { name: '2' }]);
  });
});
