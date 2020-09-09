/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-26T10:38:48-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-27T15:17:17-07:00
 */

import axios from 'axios'

function callAPI (route, data = null, method = 'get') {
  return axios(process.env.VUE_APP_ROOT_API + route, { method: method, data: data, withCredentials: true })
}

export default {
  layers: async () => {
    return (await callAPI('layers'))
  },
  points: async () => {
    return (await callAPI('points')).data.data
  }
}
