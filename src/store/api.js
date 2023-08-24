/**
  Filename: api.js
  Description:
    Make requests to public APIs for data.
*/

/*
import axios from 'axios'
function callAPI (route, data = null, method = 'get') {
  return axios(process.env.VUE_APP_ROOT_API + route, {
    method: method,
    data: data,
    withCredentials: true
  })
}
*/

export default {
  /*
  layers: async () => {
    return (await callAPI('layers'))
  },
  points: async () => {
    return (await callAPI('points')).data.data
  },
*/
  buildingGeoJSON: async () => {
    return null
  }
}
