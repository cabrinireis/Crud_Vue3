import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginSusNet.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListPatient.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('isAuthenticated')
  if (to.name !== 'login' && !user) next({ name: 'login' })
  // if the user is not authenticated, `next` is called twice
  next()
  // explicitly return false to cancel the navigation
})

export default router
