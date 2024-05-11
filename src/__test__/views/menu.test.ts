import { describe, expect, beforeEach, vi, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia } from 'pinia';
import pinia, { GlobalStore } from '@/stores';
import Menu from '@/views/menu/index.vue';
import router from '@/router';
import i18n from '@/locale/index';
import { getInfo } from '@/utils/bridge';
import waitMoment from '@/__test__/tools/waitMoment';
import App from '@/App.vue';
describe('@/views/menu/index.vue', () => {
  const mocks = {
    $route: { params: { id: '6078897355562082305' } },
    $router: {
      push: vi.fn(),
    },
  };
  beforeEach(() => {
    // $routerMock.push.mockReset(); // reset the mock between test cases
    setActivePinia(pinia);
  });
  test('1.show help dialog', async () => {
    const wrapper = mount(Menu, {
      global: {
        plugins: [i18n, router],
        mocks,
      },
    });
    expect(wrapper).toBeTruthy();

    expect(wrapper.find('.help-icon').exists()).toBe(true);
    await wrapper.find('.help-icon').trigger('click');
    // expect(wrapper.find('.dialog-wrap').isVisible()).toBe(true);
  });
  test('2.Input code & Enter to search', async () => {
    const wrapper = mount(Menu, {
      global: {
        mocks,
        plugins: [i18n, router],
      },
    });
    expect(wrapper).toBeTruthy();
    const spy = vi.spyOn(router, 'push');

    const input = wrapper.find('[placeholder="Product name or number"]');
    expect(input.exists()).toBe(true);
    input.trigger('keyup.enter');
    expect(spy).toHaveBeenCalledTimes(1);
  });
  test('3.Create task menu', async () => {
    const store = GlobalStore();
    const res = await getInfo();
    await store.setUserInfo(res);
    router.push({ name: 'menu', params: { id: '6078897355562082305' } });
    const wrapper = mount(App, {
      global: {
        mocks,
        plugins: [i18n, router],
      },
    });
    await router.isReady();
    expect(wrapper).toBeTruthy();

    await wrapper.vm.$nextTick();
    await waitMoment(10);
    const menu = wrapper.findAll('[data-ref]');
    expect(menu.length).toBe(2);
  });
});
