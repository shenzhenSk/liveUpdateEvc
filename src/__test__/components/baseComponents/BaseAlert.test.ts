//对src/components/BaseAlert/index.vue 进行单元测试
//不使用pinia
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseAlert from '@/components/baseComponents/BaseAlert/index.vue';

describe('1.BaseAlert testing', () => {
  test('1.BaseAlert', async () => {
    //mount BaseAlert
    const wrapper = mount(BaseAlert, {
      props: {
        show: true,
        title: 'test_txt_title',
        message: 'test_txt_message',
      },
    });
    //nextTick
    await wrapper.vm.$nextTick();
    //判断wrapper中是否包含有一个base-wrap类
    expect(wrapper.findAll('.alert-wrap').length).toBe(1);
    //判断wrapper中是否包含有test_txt_title文本
    expect(wrapper.text()).toContain('test_txt_title');
    //判断wrapper中是否包含有test_txt_message文本
    expect(wrapper.text()).toContain('test_txt_message');
  });
});
