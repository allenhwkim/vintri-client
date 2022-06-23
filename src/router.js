import { createRouter, createWebHashHistory } from 'vue-router';

import auth from './services/auth';

// components
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'
import NotFound from './components/NotFound.vue'
import Beers from './components/Beers.vue'
import Beer from './components/Beer.vue'

// routes
const routes = [
  { path: '/', redirect: { name: 'beers'} },
  { path: '/logout', name: 'logout', component: Logout, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: Login },
  { path: '/beers', name: 'beers', component: Beers, meta: { requiresAuth: true } },
  { path: '/beers/:id', name: 'beer', component: Beer, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
]

const router = createRouter({ 
  history: createWebHashHistory(), 
  routes 
})

// auth guard
router.beforeEach((to, _from) => {
  if (to.meta.requiresAuth && !auth.token) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router