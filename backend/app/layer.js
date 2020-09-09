/*
 * @Author: Brogan
 * @Date:   Thursday September 5th 2019
 * @Last Modified By:  Brogan
 * @Last Modified Time:  Thursday September 5th 2019
 * @Copyright:  (c) Your Company 2019
 */

const DB = require('/opt/nodejs/test-sql-access.js')
const Layer = require('/opt/nodejs/models/layer.js')
const Response = require('/opt/nodejs/response.js')
const User = require('/opt/nodejs/user.js')

// return all of the layers
exports.get = async (event, context) => {
  let response = new Response(event)

  // Connect to the database
  await DB.connect()

  // Get a list of all layers
  const data = await DB.query("SELECT * FROM layer")

  // Create an array of Layer instances
  const layers = data.map( layer => new Layer(layer.layer_id, layer.name, layer.color, layer.icon) )

  // Return the array to the user
  response.body = JSON.stringify(layers)
  response.headers = {
    'Access-Control-Allow-Origin': '*'
    'Access-Control-Allow-Credentials': 'true'
  }
  return response
}
