//对 src/components/baseComponents/PageLoading/index.vue 进行单元测试
//不使用pinia
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PageLoading from '@/components/baseComponents/PageLoading/index.vue';
describe('1.PageLoading testing', () => {
  test('1.PageLoading', async () => {
    //mount PageLoading
    const wrapper = mount(PageLoading, {
      props: {
        show: true,
      },
    });
    //nextTick
    await wrapper.vm.$nextTick();
    //判断wrapper中是否包含有一个base-wrap类
    expect(wrapper.findAll('.loading-spinner').length).toBe(1);
  });
});
