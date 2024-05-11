//对src/components/BaseDialog/index.vue 进行单元测试
//不使用pinia
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseDialog from '@/components/baseComponents/BaseDialog/index.vue';
describe('1.BaseDialog testing', () => {
  test('1.BaseDialog', async () => {
    //mount BaseAlert
    const wrapper = mount(BaseDialog, {
      props: {
        show: true,
        title: 'test_txt_title',
        message: 'test_txt_message',
      },
      //slots
      slots: {
        default: '<div>test_txt_default</div>',
      },
    });
    //nextTick
    await wrapper.vm.$nextTick();
    //判断wrapper中是否包含有一个base-wrap类
    expect(wrapper.findAll('.dialog-wrap').length).toBe(1);
    //判断wrapper中是否包含有test_txt_default文本
    expect(wrapper.text()).toContain('test_txt_default');
  });
});
