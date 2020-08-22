/*
 * @Author: Adam Oberg
 * @Date:   Tuesday Aug 21th 2020
 * @Last Modified By:  Adam Oberg
 * @Last Modified Time:  Aug 21th 2020
 * @Copyright:  (c) Oregon State University 2020
 */


class Point {
  constructor (mapId) {
    this.mapId = mapId
    this.name = ""
    this.image = ""
    this.description = ""
    this.visable = ""
    this.type = ""
    this.tags = []

  }

  addTag (tag_id) {
    this.tags.push(tag_id)
  }

  setVariables(name, desc, image, vis, type) {
    this.name = name
    this.description = desc
    this.image = image
    this.visable = vis
    this.type = type

  }

  get
  data () {
    return {
      id: this.mapId,
      name: this.name,
      image: this.image,
      description: this.description,
      visable: this.visable,
      type: this.type,
      tags: this.tags
    }
  }
}

module.exports = Point
