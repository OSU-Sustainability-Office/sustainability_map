/*
 * @Author: Adam Oberg
 * @Date:   Tuesday Aug 21th 2020
 * @Last Modified By:  Adam Oberg
 * @Last Modified Time:  Aug 21th 2020
 * @Copyright:  (c) Oregon State University 2020
 */
const DB = require('/opt/nodejs/test-sql-access.js')

//Paramaters:
    // layer_id = number
    // name = string
class Layer {
  constructor (layer_id, name) {
    this.layer_id = layer_id
    this.name = ""
  }

  setVariables(name) {
    this.name = name
  }

  async download(layer_id){
    await DB.connect()
    let data = await DB.query('SELECT * FROM layer WHERE layer_id = ?', [this.layer_id])
    return(data)
  }

  get
  data () {
    return {
      id: this.layer_id,
      name: this.name,
    }
  }
}

module.exports = Layer
