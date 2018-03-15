import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import goodDetail from '@/components/goodDetail'
import carts from '@/components/carts'
import information from '@/components/information'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/goodDetail', name: 'goodDetail', component: goodDetail },
    { path: '/carts', name: 'carts', component: carts },
    { path: '/information', name: 'information', component: information }
  ]
})
