/*
 * @Author: Adam Oberg
 * @Date:   Tuesday Aug 21th 2020
 * @Last Modified By:  Adam Oberg
 * @Last Modified Time:  Aug 21th 2020
 * @Copyright:  (c) Oregon State University 2020
 */

export default class Tag {
  constructor (tag_id, name = null, img = null, description = null) {
    this.tag_id = tag_id
    this.name = name
    this.img = img
    this.description = description
  }
}
