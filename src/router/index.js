import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import LoLRecord from '@/components/LoLRecord'

Vue.use(Router)

/* eslint-disable no-alert, no-console */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/record',
      name: 'lolRecord',
      component: LoLRecord
    }
  ]
})
