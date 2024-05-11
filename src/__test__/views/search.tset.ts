//对 src/views/search/index.vue 进行单元测试
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Search from '@/views/search/index.vue';
describe('1.Search.vue testing', () => {
  test('1.Search.vue', async () => {
    //测试Search.vue
    const wrapper = mount(Search);
    //判断Search.vue是否正常工作
    expect(wrapper).toBeTruthy();
  });
});
