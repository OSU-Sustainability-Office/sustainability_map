/*
 * @Author: Adam Oberg
 * @Date:   Tuesday Aug 21th 2020
 * @Last Modified By:  Adam Oberg
 * @Last Modified Time:  Aug 21th 2020
 * @Copyright:  (c) Oregon State University 2020
 */
const DB = require('/opt/nodejs/test-sql-access.js')

class Point {
  constructor (mapId, name = null, image = null, description = null, visible = null, type = null, tags = null) {
    this.mapId = mapId
    this.name = name
    this.image = image
    this.description = description
    this.visible = visible
    this.type = type
    this.tags = tags
  }

  addTag (tag_id) {
    this.tags.push(tag_id)
  }

  async download () {
    // Connect to the database
    await DB.connect()

    // Download this point's data
    const data = await DB.query("SELECT * FROM point WHERE mapId = ?", [this.mapId])
    if (data.length === 1) {
      this.name = data[0].name
      this.image = data[0].image
      this.description = data[0].description
      this.visible = data[0].visible
      this.type = data[0].type
      this.tags = data[0].tags
    } else {
      throw "Point not found."
    }
  }

  get
  data () {
    return {
      id: this.mapId,
      name: this.name,
      image: this.image,
      description: this.description,
      visible: this.visible,
      type: this.type,
      tags: this.tags
    }
  }
}

module.exports = Point
