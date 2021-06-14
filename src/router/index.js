/**
 * Filename: index.js
 * Description: This file describes the routes used by the Vue client-side router.
*/

import Vue from 'vue'
import Router from 'vue-router'
import notfound from '@/components/extras/404.vue'
import map from '@/components/map/map.vue'
import sideView from '@/components/map/sideView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: map
    },
    {
      path: '/sideView',
      name: 'sideView',
      component: sideView
    },
    {
      path: '*',
      component: notfound
    }
  ]
})
