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

exports.get = async (event, context) => {
  let response = new Response(event)
  // response.body = JSON.stringify(event)
  // console.log(response)
  // await DB.connect()
  // let data = await DB.query('SELECT * FROM layer WHERE layer_id = ?', [event.queryStringParameters.id])
  // response.body = JSON.stringify(data)

  response.body = JSON.stringify(await new Layer().download(event.queryStringParameters.id))


  return response
}
