/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-26T10:38:55-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-27T16:47:48-07:00
 */

import API from '@/API/api.js'
import SMFeature from '@/assets/SMFeature.js'
import SMBuilding from '@/assets/SMBuilding.js'
import L from 'leaflet'

const state = {
  features: [], //  Of type SMFeature
  buildings: []
}

const getters = {
  queryFeatures: state => query => {
    let matchedItems = []
    for (let feature of state.features) {
      matchedItems = matchedItems.concat(feature.queryItems(query))
    }
    return matchedItems
  },
  queryFeaturesByBounds: state => (bounds, features) => {
    return features.reduce((accm, feature) => {
      if (bounds.contains(L.geoJSON(feature).getBounds().getCenter())) {
        accm.push(feature)
      }
      return accm
    }, [])
  },
  queryBuildings: state => queryString => {
    return state.buildings.reduce((accm, building) => {
      if (building.query(queryString)) {
        accm.push(building)
      }
      return accm
    }, [])
  },
  queryBuildingFeatures: (state, getters) => buildingID => {
    const building = state.buildings.find(el => {
      return el.properties.id === buildingID
    })
    return getters.queryFeaturesByBounds(L.geoJSON(building).getBounds())
  }
}

const mutations = {
  addFeature: (state, feature) => {
    state.features.push(feature)
  },
  addBuilding: (state, building) => {
    try {
      L.geoJSON(building)
      state.buildings.push(building)
    } catch (err) {
      // Do nothing for bad json
    }
  }
}

const actions = {
  loadAllFeatures: async ({ dispatch, commit, getters }, payload) => {
    const features = await API.features()
    for (const feature of features) {
      commit('addFeature', new SMFeature(feature.name, feature.items, feature.color))
    }
    return Promise.resolve()
  },
  loadAllBuildings: async ({ dispatch, commit, getters }, pawload) => {
    const buildings = await API.buildings()
    for (const buildingJSON of buildings) {
      const building = new SMBuilding(buildingJSON)
      try {
        if (getters.queryFeaturesByBounds(L.geoJSON(building).getBounds(), getters.queryFeatures(/.*/)).length > 0) {
          commit('addBuilding', building)
        }
      } catch (err) {
        continue
      }
    }
    return Promise.resolve()
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
