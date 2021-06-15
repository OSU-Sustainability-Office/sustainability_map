/*
    Filename: features.js
    Description:
        This file statically loads the GeoJSON features shown
        on the sustainability map
*/

import StaticFeatures from '@/assets/GeoJSON/sustainability_features.json'

const state = {
  features: StaticFeatures
}

const getters = {
  getFeatures: (state, getters) => {
    return state.features
  }
}

const mutations = {
  // todo: mutations
}

const actions = {
  // todo: actions
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
