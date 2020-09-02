/*
 * @Author: Brogan
 * @Date:   Thursday September 5th 2019
 * @Last Modified By:  Brogan
 * @Last Modified Time:  Thursday September 5th 2019
 * @Copyright:  (c) Your Company 2019
 */

const Tag = require('/opt/nodejs/models/tag.js')
const Response = require('/opt/nodejs/response.js')
const User = require('/opt/nodejs/user.js')

exports.get = async (event, context) => {
  let response = new Response(event)
  // response.body = JSON.stringify(new Tag().download(1))
  // console.log(response)
  // // await DB.connect()
  // console.log(1)
  // let data = await DB.query('SELECT * FROM layer WHERE layer_id = ?', [this.layer_id])
  response.body = JSON.stringify(await new Tag().download(event.queryStringParameters.id))
  return response
}
