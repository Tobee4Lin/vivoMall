import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import goodDetail from '@/components/goodDetail'
import carts from '@/components/carts'
import information from '@/components/information'
import my from '@/components/my'
import choose from '@/components/choose'
import parts from '@/components/parts'
import order from '@/components/order'
import news from '@/components/news'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/goodDetail', name: 'goodDetail', component: goodDetail },
    { path: '/carts', name: 'carts', component: carts },
    { path: '/information', name: 'information', component: information },
    { path: '/my', name: 'my', component: my },
    { path: '/choose', name: 'choose', component: choose },
    { path: '/parts', name: 'parts', component: parts },
    { path: '/order', name: 'order', component: order },
    { path: '/news', name: 'news', component: news }
  ]
})
