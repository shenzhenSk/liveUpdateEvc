import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home/index.vue';
import Search from '@/views/search/index.vue';
import Product from '@/views/product/index.vue';
import Menu from '@/views/menu/index.vue';
import NotFount from '@/views/404/index.vue';
import Detail from '@/views/detail/index.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/menu/:id',
      name: 'menu',
      component: Menu,
    },

    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
    {
      path: '/:pathMath(.*)',
      name: '404',
      component: NotFount,
    },
  ],
});

export default router;
