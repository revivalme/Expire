import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/signin', component: 'Signin' },
  { path: '/signup', component: 'Signup' },
  { path: '/home', component: 'Home', meta: { requiresAuth: true } },
  { path: '/expire', component: 'Expire', meta: { requiresAuth: true, department: true, store: true } },
  { path: '/productsadd', component: 'ProductsAdd', meta: { requiresAuth: true, department: true, store: true } },
  { path: '/productsreturn', component: 'ProductsReturn', meta: { requiresAuth: true, department: true, store: true } },
  { path: '/historyproducts', component: 'HistoryProducts', meta: { requiresAuth: true, department: true, store: true } },
  { path: '*', component: 'NotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.store && record.meta.department)) {
    if (!localStorage.store && !localStorage.department) {
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
