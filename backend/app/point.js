/*
 * @Author: Brogan
 * @Date:   Thursday September 5th 2019
 * @Last Modified By:  Brogan
 * @Last Modified Time:  Thursday September 5th 2019
 * @Copyright:  (c) Your Company 2019
 */
const DB = require('/opt/nodejs/test-sql-access.js')
const Point = require('/opt/nodejs/models/point.js')
const Response = require('/opt/nodejs/response.js')
const User = require('/opt/nodejs/user.js')

exports.get = async (event, context) => {
  let response = new Response(event)
  // Get 1 point if the user specifies an ID
  if (event.queryStringParameters && event.queryStringParameters.id) {
      // if queryStringParameters exists and queryStringParameters.id exists (both are not null)
      let point = new Point(event.queryStringParameters.id)

      // download the point's data
      try {
        await point.download()

        // Format the response
        response.body = JSON.stringify([point])
      } catch (e) {
        // 404 if the point is not found
        response.statusCode = 404
        response.body = JSON.stringify(e)
      }
      return response
  }

  // Get all points if the user did not specify an ID
  // Connect to the database
  await DB.connect()

  // Get a list of all points
  const data = await DB.query("SELECT * FROM point")

  // Create an array of Point instances
  const points = data.map( point => new Point(point.mapId, point.name, point.image, point.description, point.visible, point.type, point.tags) )

  // Return the array to the user
  response.body = JSON.stringify(points)
  return response
}
