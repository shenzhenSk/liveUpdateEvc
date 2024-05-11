import { describe, expect, beforeEach, vi, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia } from 'pinia';
import pinia, { GlobalStore } from '@/stores';
import Home from '@/views/home/index.vue';
import router from '@/router';
import i18n from '@/locale/index';
import { getInfo } from '@/utils/bridge';
describe('@/views/home/index.vue', () => {
  const $routerMock = {
    push: vi.fn(),
  };
  beforeEach(() => {
    setActivePinia(pinia);
    $routerMock.push.mockReset(); // reset the mock between test cases
  });
  test('1.show help dialog', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [i18n, router],
      },
    });
    expect(wrapper).toBeTruthy();

    expect(wrapper.find('.help-icon').exists()).toBe(true);
    await wrapper.find('.help-icon').trigger('click');
    // expect(wrapper.find('.dialog-wrap').isVisible()).toBe(true);
  });
  test('2.Input code & Enter to search', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [i18n, router],
      },
    });
    expect(wrapper).toBeTruthy();
    const spy = vi.spyOn(router, 'push');

    const input = wrapper.find('[placeholder="Product name or number"]');
    expect(input.exists()).toBe(true);
    input.trigger('keyup.enter');

    expect(spy).toHaveBeenCalledTimes(1);
    // await wrapper.vm.$nextTick();
  });
  test('3.Create task menu', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [i18n, router],
      },
    });
    expect(wrapper).toBeTruthy();
    const store = GlobalStore();
    const res = await getInfo();
    await store.setUserInfo(res);
    await wrapper.vm.$nextTick();
    // const spy = vi.spyOn(router, 'push');
    await wrapper.vm.$nextTick();
    const menu = wrapper.findAll('[data-ref]');
    expect(menu.length).toBe(3);
    // expect(menu.exists()).toBe(true);
    // await wrapper.find('[data-ref="menu0"]').trigger('click');
    // await wrapper.vm.$nextTick();
    // expect(spy).toHaveBeenCalledTimes(1);
  });
});
