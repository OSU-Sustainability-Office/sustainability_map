/*
  Filename: decorative_features.js
  Description: aesthetic features (don't contain popups or other meta-data)
*/
import Buildings from '@/assets/GeoJSON/building_features.json'

const state = {
  Decorations: {
    Buildings
  }
}

const getters = {
  getBuildings: (state, getters) => {
    return state.Decorations.Buildings.features
  }
}
const mutations = {}
const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
