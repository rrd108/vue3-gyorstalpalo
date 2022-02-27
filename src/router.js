import { createRouter, createWebHistory } from 'vue-router'
import Welcome from './components/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('./pages/Settings.vue'),
  },
  {
    path: '/tasks/:filter?',
    name: 'Tasks',
    component: () => import('./pages/Tasks.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('./pages/User.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
