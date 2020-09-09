/*
 * @Author: Adam Oberg
 * @Date:   Tuesday Aug 21th 2020
 * @Last Modified By:  Adam Oberg
 * @Last Modified Time:  Aug 21th 2020
 * @Copyright:  (c) Oregon State University 2020
 */

export default class Point {
  constructor (mapId, name = null, img = null, description = null, visible = null, type = null, tags = null) {
    this.mapId = mapId
    this.name = name
    this.img = img
    this.description = description
    this.visible = visible
    this.type = type
    this.tags = tags
  }
}
