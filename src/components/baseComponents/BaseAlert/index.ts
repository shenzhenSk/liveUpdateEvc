import { createApp } from 'vue';
import BaseAlert from './index.vue';
import { $t } from '@/locale';
import NativeAPI from 'superapp-miniapp-invoke-native';
let app: any = null;
let mountNode: any = null;
export default function Alert(options: object) {
  // 创建节点
  mountNode = document.createElement('div');
  // 插入body
  document.body.appendChild(mountNode);
  // 创建实例
  app = createApp(BaseAlert, {
    show: true,
    remove: () => {
      app.unmount(); // 销毁实例
      mountNode.remove();
    },
    title: $t('dialog.errorMessage'),
    ...options,
  });

  return app.mount(mountNode);
}
Alert.close = function () {
  NativeAPI.communicatePlugins.showSubMask({ subMask: false });
  app?.unmount?.(); // 销毁实例
  mountNode?.remove?.();
};
