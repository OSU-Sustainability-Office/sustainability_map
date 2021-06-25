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

  // returns all loaded features as an array of geatures
  getFeatures: (state, getters) => {
    const displayedFeatures = getters.getTourNames.reduce((accum, tourName) => {
      accum = accum.concat(state.features[tourName].features)
      return accum
    }, [])

    // remove GeoJSON features from non-visible categories
    return displayedFeatures.filter(feature => state.visibleCategories[feature.properties.category])
  },

  getTour: (state, getters) => (tourName) => {
    return state.features[tourName]
  },

  getCategories: (state, getters) => {
    return Object.keys(state.visibleCategories)
  },

  getVisibleCategories: (state, getters) => {
    return getters.getCategories.filter(category => state.visibleCategories[category])
  },
  // returns closure which will return features which contain text string
  searchFeatures: (state, getters) => (query) => {
    // the filter argument function just takes in a feature object which I'm destructuring
    return getters.getFeatures.filter(({ properties: { info, name } }) => {
      return (info.toLowerCase() + name.toLowerCase()).includes(query.toLowerCase())
    })
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
