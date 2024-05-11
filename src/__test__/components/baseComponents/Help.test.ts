//对 src/components/baseComponents/Help.vue 进行单元测试
//不使用pinia
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Help from '@/components/baseComponents/Help/index.vue';
import router from '@/router';
describe('1.Help testing', () => {
  test('1.Help', async () => {
    //mount Help
    const wrapper = mount(Help, {
      global: {
        plugins: [router],
      },
      props: {
        title: 'test_txt_title',
      },
      slots: {
        default: '<div>test_txt_message</div>',
      },
    });
    //nextTick
    await wrapper.vm.$nextTick();

    const helpIcon = wrapper.find('.help-icon');
    //判断helpIcon是否存在
    expect(helpIcon.exists()).toBe(true);
    //触发helpIcon的click事件
    await helpIcon.trigger('click');
    //nextTick
    await wrapper.vm.$nextTick();

    //判断wrapper中是否包含有test_txt_message文本
    expect(wrapper.text()).toContain('test_txt_message');
    //判断wrapper中是否包含有test_txt_title文本
    expect(wrapper.text()).toContain('test_txt_title');
  });
});
