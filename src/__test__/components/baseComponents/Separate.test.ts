//对 src/components/baseComponents/Separate/index.vue 进行单元测试
//不使用pinia
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Separate from '@/components/baseComponents/Separate/index.vue';
describe('1.Separate testing', () => {
  test('1.Separate', async () => {
    //mount Separate
    const wrapper = mount(Separate, {
      props: {
        title: 'test_txt_title',
      },
    });
    //nextTick
    await wrapper.vm.$nextTick();
    //判断wrapper中是否包含有一个base-wrap类
    expect(wrapper.findAll('.separate').length).toBe(1);
    //判断wrapper中是否包含有test_txt_title文本
    expect(wrapper.text()).toContain('test_txt_title');
  });
});
