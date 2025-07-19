import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        {
          path: '/design/:designId/edit',
          name: 'edit-design',
          component: () => import('@/views/EditDesignView.vue')
        },
        {
          path: '/design/add',
          name: 'add-design',
          component: () => import('@/views/AddDesignView.vue')
        }
      ]
    }
  ]
});

export default router;
