import Vue from 'vue'
import Router from 'vue-router'
import LoLHome from '@/components/LoLHome'
import LoLMain from '@/components/LoLMain'

Vue.use(Router)

/* eslint-disable no-alert, no-console */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoLHome',
      component: LoLHome
    },
    {
      path: '/record',
      name: 'LoLMain',
      component: LoLMain
    }
  ]
})
