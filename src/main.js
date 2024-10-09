import './main.css'; // Ensure this is imported at the top of the file

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import WalineComments from '@/components/WalineComments.vue';

const routes = [
  { path: '/', component: WalineComments },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = 'Shinigami'; // Set the page title for all routes
  next();
});

createApp(App).use(router).mount('#app');
