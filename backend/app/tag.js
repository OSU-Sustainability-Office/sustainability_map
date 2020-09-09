/*
 * @Author: Brogan
 * @Date:   Thursday September 5th 2019
 * @Last Modified By:  Brogan
 * @Last Modified Time:  Thursday September 5th 2019
 * @Copyright:  (c) Your Company 2019
 */
const DB = require('/opt/nodejs/test-sql-access.js')
const Tag = require('/opt/nodejs/models/tag.js')
const Response = require('/opt/nodejs/response.js')
const User = require('/opt/nodejs/user.js')

exports.get = async (event, context) => {
  let response = new Response(event)
  // Get 1 tag if the user specifies an ID
  if (event.queryStringParameters && event.queryStringParameters.id) {
      // if queryStringParameters exists and queryStringParameters.id exists (both are not null)
      let tag = new Tag(event.queryStringParameters.id)

      // download the tag's data
      try {
        await tag.download()

        // Format the response
        response.body = JSON.stringify([tag])
      } catch (e) {
        // 404 if the tag is not found
        response.statusCode = 404
        response.body = JSON.stringify(e)
      }
      return response
  }

  // Get all Tags if the user did not specify an ID
  // Connect to the database
  await DB.connect()

  // Get a list of all Tags
  const data = await DB.query("SELECT * FROM tag")

  // Create an array of Tag instances
  const tags = data.map( tag => new Tag(tag.tag_id, tag.name, tag.img, tag.description) )

  // Return the array to the user
  response.body = JSON.stringify(tags)
  return response
}
