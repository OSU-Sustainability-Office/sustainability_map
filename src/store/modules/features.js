/*
    Filename: features.js
    Description:
        This file statically loads the GeoJSON features shown
        on the sustainability map organized as "tours."
*/

import FeaturesTour from '@/assets/GeoJSON/sustainability_features.json'

const state = {
  features: {
    FeaturesTour
  },
  visibleCategories: {
    bike: true,
    general: true,
    dining: true,
    rain: true
  }
}

const getters = {
  getTourNames: (state, getters) => {
    return Object.keys(state.features)
  },

  // returns all loaded features
  getFeatures: (state, getters) => {
    // concatenate all the tours into a single GeoJSON Feature Collection
    const displayedFeatures = getters.getTourNames.reduce((accum, tourName) => {
      accum.features = accum.features.concat(state.features[tourName].features)
      return accum
    },
    {
      type: 'FeatureCollection',
      name: 'Displayed Sustainability Features',
      features: []
    })

    // remove GeoJSON features from non-visible categories
    displayedFeatures.features = displayedFeatures.features.filter(feature => state.visibleCategories[feature.properties.category])

    return displayedFeatures
  },

  getTour: (state, getters) => (tourName) => {
    return state.features[tourName]
  },

  getCategories: (state, getters) => {
    return Object.keys(state.visibleCategories)
  },

  getVisibleCategories: (state, getters) => {
    return getters.getCategories.filter(category => state.visibleCategories[category])
  }
}

const mutations = {
  toggleCategory: (state, category) => {
    state.visibleCategories[category] = !state.visibleCategories[category]
  }
}

const actions = {
  // todo: add actions (if needed)
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
