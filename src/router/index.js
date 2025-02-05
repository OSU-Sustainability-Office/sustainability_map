/**
 * Filename: index.js
 * Description: This file describes the routes used by the Vue client-side router.
 */

import { createRouter, createWebHistory } from 'vue-router'
import notfound from '@/components/extras/404.vue'
import map from '@/components/map/map.vue'
import sideView from '@/components/map/sideView.vue'

export default createRouter({
  history: createWebHistory('/sustainability_map/'),
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
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
