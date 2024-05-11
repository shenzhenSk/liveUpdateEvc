//对 src/components/baseComponents/SvgIcon/index.vue 进行单元测试
//不使用pinia
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import SvgIcon from '@/components/baseComponents/SvgIcon/index.vue';
describe('1.SvgIcon testing', () => {
  test('1.SvgIcon', async () => {
    //mount SvgIcon
    const wrapper = mount(SvgIcon, {
      props: {
        name: 'general/add',
      },
    });
    //nextTick
    await wrapper.vm.$nextTick();
    //判断wrapper是否正常渲染
    expect(wrapper.findAll('svg').length).toBe(1);
  });
});
