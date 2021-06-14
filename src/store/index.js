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

Vue.use(Vuex)
Vue.use(Geoloc)


const getters = {
  // TODO: add getters
}

const mutations = {
  // TODO: add mutations
}
const actions = {
  // TODO: add actions
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
