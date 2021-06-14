/**
  Filename: index.js
  Description:
    This is the main file which sets up the Vuex store.
*/
import Vue from 'vue'
import Vuex from 'vuex'
import {
  Geoloc
} from 'vuelayers'

// const axios = require('axios')
// const osmtogeojson = require('osmtogeojson')

import FeatureModule from './modules/feature.js'

Vue.use(Vuex)
Vue.use(Geoloc)

const getters = {}
const mutations = {}
const actions = {}
const state = {}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    FeatureModule
  }
})


export default store
