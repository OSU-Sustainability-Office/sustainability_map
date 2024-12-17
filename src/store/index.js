/**
  Filename: index.js
  Description:
    This is the main file which sets up the Vuex store.
*/
import { createStore } from 'vuex'

// const osmtogeojson = require('osmtogeojson')

import DecorativeFeatureModule from './modules/decorative_features.js'
import FeatureModule from './modules/informative_features.js'
import LayerModule from './modules/layers.js'

const getters = {}
const mutations = {}
const actions = {}
const state = {}

const store = createStore({
  state,
  mutations,
  getters,
  actions,
  modules: {
    FeatureModule,
    LayerModule,
    DecorativeFeatureModule
  }
})

export default store
