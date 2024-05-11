//对src/utils/formatPrice.ts 进行单元测试
import { describe, expect, test } from 'vitest';
import { formatPrice } from '@/utils/filter';
describe('1.formatPrice testing', () => {
  test('1.formatPrice', async () => {
    //测试formatPrice
    const price = 100.1;
    //判断formatPrice是否正常工作
    expect(formatPrice(price)).toBe('100,1');
  });
});
