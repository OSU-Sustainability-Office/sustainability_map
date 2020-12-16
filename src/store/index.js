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
import {
  Geoloc
} from 'vuelayers'
import Layer from './models/layer'
import Point from './models/point'
import Tag from './models/tag'

const axios = require('axios')
var osmtogeojson = require('osmtogeojson')

Vue.use(Vuex)
Vue.use(Geoloc)

const state = {
  'Layers': [], //Array of the Layer object  from models/layer
  'Points': [], //Array of the Point object  from models/point
  'Tags': [], //Array of the Tag object  from models/tag
  'ModalName': ''
}


const getters = {
  modalName: (state) => 'ModalName',
  getLayers: (state) => state['Layers'],
  getPoints: (state) => state['Points'],
  getTags: (state) => state['Tags']
}

const mutations = {
  modalName (state, name) {
   state.modalName = name
 },
  addLayers: (state, layers) => {
    state['Layers'] = state['Layers'].concat(layers)
    state['Layers'] = state['Layers'].map(layer => {
      layer.color = '#' + layer.color
      return layer
    })
  },
  addPoint: (state, point) => {
    const index = state['Points'].map(point => point['mapId']).indexOf(point['mapId'])
    if (index === -1) {
      // Point does not exist in VueX yet
      point.geoJSON.features = [point.geoJSON.features[0]]
      // The first index of the features array is always the pollygon.
      state['Points'].push(point)
    } else {
      // Point is already in our VueX store
      state['Points'][index] = point
    }
  },
  addTags: (state, tags) => {
    state['Tags'] = state['Tags'].concat(tags)
  }
}
const actions = {
  openModal (store, payload) {
    store.commit('modalName', payload['name','id'])
  },

  closeModal (store) {
    store.commit('modalName', '')
    },
  downloadLayers: (context) => {
    axios.get(process.env.VUE_APP_ROOT_API + '/layers')
      .then(function(response) {
        // handle success
        context.commit('addLayers', response.data)
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
  },
  downloadPoints: (context) => {
    axios.get(process.env.VUE_APP_ROOT_API + '/points')
      .then(function(response) {
        // handle success
        response.data.forEach(point => {
          point.visible = point.visible.data[0] === 1
          axios.get('https://api.openstreetmap.org/api/0.6/' + point['osmType'] + '/' + point['mapId'] + (point['osmType'] == 'way' ? '/full' : ''))
          .then(response => {
            console.log((point['osmType'] == 'way' ? '/full' : ''))
            // have access to both:
            // 1. "point" - defined by the database schema
            // 2. response.data - an object corresponding to the point's mapid
            point.geoJSON = osmtogeojson(response.data)
            context.commit('addPoint', point)
          })
          .catch(error => {
            console.log(error)
          })
        })
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
  },
  downloadTags: (context) => {
    axios.get(process.env.VUE_APP_ROOT_API + '/tags')
      .then(function(response) {
        // handle success
        context.commit('addTags', response.data)
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
