import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../pages/home/Home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../pages/login/Login')
  },
  {
    path: '/trips',
    name: 'trips',
    component: () => import(/* webpackChunkName: "about" */ '../pages/trips/ListTrips')
  },
  {
    path: '/trip-finance/:id',
    name: 'trip-finance',
    component: () => import(/* webpackChunkName: "about" */ '../pages/trips/TripFinance')
  },
  {
    path: '/cars',
    name: 'cars',
    component: () => import(/* webpackChunkName: "about" */ '../pages/cars/ListCars')
  },
  {
    path: '/new-car',
    name: 'new-car',
    component: () => import(/* webpackChunkName: "about" */ '../pages/cars/NewCar')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
