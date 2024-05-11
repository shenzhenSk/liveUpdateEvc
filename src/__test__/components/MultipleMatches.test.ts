// Path: src/components/MultipleMatches/index.vue
// 单元测试
// 会使用到store
import { beforeEach, describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MultipleMatches from '@/components/MultipleMatches/index.vue';
import { setActivePinia } from 'pinia';
import pinia, { GlobalStore } from '@/stores';
import router from '@/router';
import i18n from '@/locale/index';
describe('1.MultipleMatches testing', () => {
  beforeEach(() => {
    setActivePinia(pinia);
  });
  test('1.MultipleMatches', async () => {
    const store = GlobalStore();
    await store.setLanguage('en_US');
    await store.setMultipleMatches([
      {
        location: '0700.02.1.009.1',
        productImg: '',
        barcode: '8710447280065',
        promo: 'Y',
        itemDesc: 'Dove-Douchefoam Ross Oil',
        itemCode: '4335318',
        content: '200ml',
        currencySign: '$',
        promotionPrice: 7.39,
        retailPrice: 7.39,
        brandName: 'Dove',
      },
      {
        location: '1639.01.0.125.1',
        productImg: '',
        barcode: '36005307330733842',
        promo: 'Y',
        itemDesc: 'Maybelline - Conc.Instant Age',
        itemCode: '2402520',
        content: '68ml',
        currencySign: '$',
        promotionPrice: 13.99,
        retailPrice: 13.99,
        brandName: 'Maybelline',
      },
    ]);
    //mount MultipleMatches
    const wrapper = mount(MultipleMatches, {
      global: {
        plugins: [i18n, router],
      },
    });
    //nextTick
    await wrapper.vm.$nextTick();
    //判断wrapper中是否包含有两个product-list-item-body类
    expect(wrapper.findAll('.product-list-item-body').length).toBe(2);
  });
});
