//对src/components/BaseToast/index.vue 进行单元测试
//不使用pinia
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseToast from '@/components/baseComponents/BaseToast/index.vue';
describe('1.BaseToast testing', () => {
  test('1.BaseToast', async () => {
    //mount BaseToast
    const wrapper = mount(BaseToast, {
      props: {
        show: true,
        title: 'test_txt_title',
        message: 'test_txt_message',
      },
    });
    //nextTick
    await wrapper.vm.$nextTick();
    //判断wrapper中是否包含有一个base-wrap类
    expect(wrapper.findAll('.toast-wrap').length).toBe(1);
    //判断wrapper中是否包含有test_txt_message文本
    expect(wrapper.text()).toContain('test_txt_message');
    //判断wrapper中是否包含有test_txt_title文本
    expect(wrapper.text()).toContain('test_txt_title');
  });
});
