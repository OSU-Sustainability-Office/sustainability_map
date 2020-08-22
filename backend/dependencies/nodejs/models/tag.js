/*
 * @Author: Adam Oberg
 * @Date:   Tuesday Aug 21th 2020
 * @Last Modified By:  Adam Oberg
 * @Last Modified Time:  Aug 21th 2020
 * @Copyright:  (c) Oregon State University 2020
 */


class Tag {
  constructor (tag_id) {
    this.tag_id = tag_id
    this.name = ""
    this.image = ""
    this.description = ""
  }

  setVariables(name, desc, image) {
    this.name = name
    this.description = desc
    this.image = image
  }

  get
  data () {
    return {
      id: this.mapId,
      name: this.name,
      image: this.image,
      description: this.description
    }
  }
}

module.exports = Tag
