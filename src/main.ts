import { createApp } from 'vue';
import store from './stores';
import baseComponents from '@/components/baseComponents';
import App from './App.vue';
import router from './router';
import i18n from './locale/';
import vconsole from 'vconsole';

import '@/assets/css/index.less';
import 'vant/es/toast/style';

//dev debug
console.log('import.meta.env.PROD', import.meta.env.PROD);

if (import.meta.env.MODE == 'development' || import.meta.env.MODE == 'testing') {
  new vconsole();
}

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);
// 导入全局的基础组件
//register base component
baseComponents(app);

app.mount('#app');
