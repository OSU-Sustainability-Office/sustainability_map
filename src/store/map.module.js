/*
 * @Author: you@you.you
 * @Date:   Tuesday May 5th 2020
 * @Last Modified By:  Brogan Miner
 * @Last Modified Time:  Tuesday May 5th 2020
 * @Copyright:  (c) Oregon State University 2020
 */
import API from './api.js'
import Building from './building.module.js'
import Path from './path.module.js'
import Feature from './feature.module.js'
import Geo from 'osmtogeojson'
import L from 'leaflet'

const state = () => {
  return {
    path: 'map',
    promise: null
  }
}

const actions = {
  /*
    Description: Loads a singular building, features are referenced by id
    Parameters: Object { id<<Integer>>, name<<String>>, description<<String>>, features<<Array Integer>>, properties<<Object>>, image<<String>> }
    Returns: Promise (resolves when building has geoJSON data)
  */
  async loadBuilding(store, payload) {

  },

  /*
    Description: Loads a singular feature
    Parameters: Object { id<<Integer>>, name<<String>>, description<<String>>, Coordinates<<Object {lat<<Integer>>, lng<<Integer>>}>>, images<<Array String>> }
    Returns: None
  */
  async loadFeature(store, payload) {

  },

  /*
    Description: Loads a singular path, building and feature arrays are referenced by id
    Parameters: Object { id<<Integer>>, name<<String>>, description<<String>>, features<<Array Integer>>, buildings<<Array Integer>> }
    Returns: None
  */
  async loadPath(store, payload) {

  },

  /*
    Description: Initializes and loads all buildings, features and paths
    Parameters: None
    Returns: None
  */
  async loadMap (store) {
    if (store.getters.promise === null) {
      store.commit('promise', new Promise(async (resolve, reject) => {
        let allContent = await API.allContent()
        let featurePromises = []
        let buildingPromises = []
        let pathPromises = []

        for (let feature of allContent.features) {
          featurePromises.push(store.dispatch('loadFeature', feature))
        }
        await Promise.all(featurePromises)

        for (let building of allContent.buildings) {
          buildingPromises.push(store.dispatch('loadBuilding', building))
        }
        let jsonPromises = await Promise.all(buildingPromises)

        for (let path of allContent.paths) {
          pathPromises.push(store.dispatch('loadPath', path))
        }
        await Promise.all(pathPromises)
        await Promise.all(jsonPromises)
        resolve()
      }))
    }
    return store.getters.promise
  }
}

const mutations = {

}

const getters = {
  path (state) {
    return state.path
  },

  promise (state) {
    return state.promise
  }
}

const modules = { }

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules
}
