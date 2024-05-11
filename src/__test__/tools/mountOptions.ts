import router from '@/router';
import i18n from '@/locale/index';

export default {
  global: {
    plugins: [i18n, router],
  },
};
