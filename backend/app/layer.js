/*
 * @Author: Brogan
 * @Date:   Thursday September 5th 2019
 * @Last Modified By:  Brogan
 * @Last Modified Time:  Thursday September 5th 2019
 * @Copyright:  (c) Your Company 2019
 */

const Layer = require('/opt/nodejs/models/layer.js')
const Response = require('/opt/nodejs/response.js')
const User = require('/opt/nodejs/user.js')

exports.get = async (event, context) => {
  let response = new Response(event)
  response.body = JSON.stringify(new Layer().download(1))
  // await DB.connect()
  // let data = await DB.query('SELECT * FROM layer WHERE layer_id = ?', [this.layer_id])
  return response
}
