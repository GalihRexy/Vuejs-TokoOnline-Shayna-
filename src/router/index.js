import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    props: true,
    name: 'Product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/shopping-cart',
    name: 'shopping-cart',
    component: () => import('../views/ShoppingCart.vue')
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('../views/Success.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
