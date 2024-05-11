// Path: src/components/ProductListItem/index.vue
// 单元测试
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductListItem from '@/components/ProductListItem/index.vue';
describe('1.ProductListItem testing', () => {
  test('1.ProductListItem', async () => {
    const wrapper = mount(ProductListItem, {
      props: {
        itemInfo: {
          itemCode: '100141',
          itemDesc: 'TOFFEE & ALMOND NUGGETS BOX',
          type: '',
          location: '2604.02.3.009.1',
          productImg: '',
          barcode: '4897888056627',
          promo: 'Y',
          weightItem: 'N',
          retailPrice: 45.9,
          currencySign: '$',
          content: '50ml',
          packSize: '',
          barcodeInfo: [
            {
              barcodeType: 'Each',
              barcode: '4897888056627',
            },
          ],
          itemHierarchy: {
            group: '1',
            dept: '1',
            subclass: '2',
            class: '1604',
          },
          itemBrand: 'INTEGRATED',
          itemSupplierInfo: {
            supplierCode: '1089576015',
            supplierName: 'INTEGRATED MARKET SERVICES ASIA ',
            primarySupplierIndicator: 'Y',
          },
        } as any,
      },
    });
    expect(wrapper.html()).toContain('INTEGRATED');
  });
});
