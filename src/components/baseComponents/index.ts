import PageLoading from './PageLoading/index.vue';
import Separate from './Separate/index.vue';
import SvgIcon from './SvgIcon/index.vue';
import Help from './Help/index.vue';
import BaseDialog from './BaseDialog/index.vue';
export default (App: any) => {
  App.component('PageLoading', PageLoading);
  App.component('Separate', Separate);
  App.component('SvgIcon', SvgIcon);
  App.component('Help', Help);
  App.component('BaseDialog', BaseDialog);
};
