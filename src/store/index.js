/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-26T10:38:55-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-27T16:47:48-07:00
 */


import L from 'leaflet'
import Vue from 'vue'
import Vuex from 'vuex'
import { Geoloc } from 'vuelayers'
import Layer from './models/layer'
import Point from './models/point'
import Tag from './models/tag'

const axios = require('axios');

Vue.use(Vuex)
Vue.use(Geoloc)

const state = {
  'Layers': [], //Array of the Layer object  from models/layer
  'Points': [], //Array of the Point object  from models/point
  'Tags': [] //Array of the Tag object  from models/tag

}

const getters = {

}

const mutations = {
  addLayers: (state, layers) => {
    state['Layers'].concat(layers)
  }


}
const actions = {
  downloadLayers: (context) => {
    // Make a request for a user with a given ID
    axios.get(process.env.VUE_APP_ROOT_API + '/layers')
      .then(function(response) {
        // handle success
        console.log(response)
        context.commit('addLayers', response.data)
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
