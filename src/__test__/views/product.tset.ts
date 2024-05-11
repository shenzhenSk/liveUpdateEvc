//对 src/views/product/index.vue 进行单元测试
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Product from '@/views/product/index.vue';
describe('1.Product.vue testing', () => {
  test('1.Product.vue', async () => {
    //测试Product.vue
    const wrapper = mount(Product);
    //判断Product.vue是否正常工作
    expect(wrapper).toBeTruthy();
  });
});
