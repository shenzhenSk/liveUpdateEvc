import { createApp } from 'vue';
import BaseToast from './index.vue';
import { $t } from '@/locale';

export default function Toast(options: object) {
  console.log(options);

  // 创建节点
  const mountNode: HTMLDivElement = document.createElement('div');
  // 插入body
  document.body.appendChild(mountNode);
  // 创建实例
  const app = createApp(BaseToast, {
    show: true,
    remove: () => {
      app.unmount(); // 销毁实例
      document.body.removeChild(mountNode);
    },
    title: $t('dialog.errorMessage'),
    ...options,
  });

  return app.mount(mountNode);
}
