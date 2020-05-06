/*
 * @Author: Brogan
 * @Date:   Thursday September 5th 2019
 * @Last Modified By:  Brogan
 * @Last Modified Time:  Thursday September 5th 2019
 * @Copyright:  (c) Your Company 2019
 */

const Feature = require('/opt/nodejs/models/feature.js')
const Response = require('/opt/nodejs/response.js')
const User = require('/opt/nodejs/user.js')

exports.all = async (event, context) => {
  let response = new Response(event)
  let returnObject = await Feature.allExpanded()
  response.body = JSON.stringify({
    buildings: Object.keys(returnObject.buildings).map(key => returnObject.buildings[key].data),
    features: Object.keys(returnObject.features).map(key => returnObject.features[key].data),
    paths: Object.keys(returnObject.paths).map(key => returnObject.paths[key].data)
  })
  return response
}
