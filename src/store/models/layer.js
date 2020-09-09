/*
 * @Author: Adam Oberg
 * @Date:   Tuesday Aug 21th 2020
 * @Last Modified By:  Adam Oberg
 * @Last Modified Time:  Aug 21th 2020
 * @Copyright:  (c) Oregon State University 2020
 */

//Paramaters:
    // layer_id = number
    // name = string

export default class Layer {
  constructor (layer_id, name = null, color = null, icon = null) {
    this.layer_id = layer_id
    this.name = name
    this.color = color
    this.icon = icon
  }
}
