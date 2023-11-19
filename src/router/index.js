import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  { path: '/login',
    component: LoginView
  },
  { path: '/dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirige al formulario de inicio de sesión si la ruta requiere autenticación y el usuario no está autenticado
    next('/login');
  } else {
    next();
  }
});

export default router