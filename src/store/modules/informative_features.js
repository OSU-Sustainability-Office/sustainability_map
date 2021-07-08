/*
    Filename: features.js
    Description:
        This file statically loads the GeoJSON features shown
        on the sustainability map organized as "tours."

        These features contain important information.
*/

import SustainabilityFeatures from '@/assets/GeoJSON/sustainability_features.json'
import GreenBuildings from '@/assets/GeoJSON/green_buildings.json'
import RainwaterFeatures from '@/assets/GeoJSON/rainwater_features.json'
import TransportationFeatures from '@/assets/GeoJSON/transportation_features.json'

const state = {
  sustainabilityFeatures: {
    SustainabilityFeatures,
    TransportationFeatures,
    GreenBuildings,
    RainwaterFeatures
  },
  visibleCategories: {
    bike: true,
    general: true,
    dining: true,
    building: true,
    rain: true
  }
}

const getters = {

  getTourNames: (state, getters) => {
    return Object.keys(state.sustainabilityFeatures)
  },

  // returns all loaded features as an array of features
  getFeatures: (state, getters) => {
    const displayedFeatures = getters.getTourNames.reduce((accum, tourName) => {
      accum = accum.concat(state.sustainabilityFeatures[tourName].features)
      return accum
    }, [])

    // remove GeoJSON features from non-visible categories
    return displayedFeatures.filter(feature => state.visibleCategories[feature.properties.category])
  },

  getTour: (state, getters) => (tourName) => {
    return state.sustainabilityFeatures[tourName]
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
