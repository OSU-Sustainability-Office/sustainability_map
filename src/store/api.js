/*
 * @Author: you@you.you
 * @Date:   Tuesday May 5th 2020
 * @Last Modified By:  Brogan Miner
 * @Last Modified Time:  Tuesday May 5th 2020
 * @Copyright:  (c) Oregon State University 2020
 */
import axios from 'axios'
axios.defaults.withCredentials = true

function callAPI (route, data = null, method = 'get', base = process.env.VUE_APP_ROOT_API, headers = null) {
  if (headers) {
    return axios(base + '/' + route, { method: method, data: data, withCredentials: true, timeout: 72000, headers: headers })
  }
  return axios(base + '/' + route, { method: method, data: data, withCredentials: true, timeout: 72000 })
}