/*
 * @Author: Adam Oberg
 * @Date:   Tuesday Aug 21th 2020
 * @Last Modified By:  Adam Oberg
 * @Last Modified Time:  Aug 21th 2020
 * @Copyright:  (c) Oregon State University 2020
 */
const DB = require("/opt/nodejs/test-sql-access.js");

//Paramaters:
// layer_id = number
// name = string

class Layer {
  constructor(layer_id, name = null, color = null, icon = null) {
    this.layer_id = layer_id;
    this.name = name;
    this.color = color;
    this.icon = icon;
  }

  async download() {
    // Lets connect to the database
    await DB.connect();

    // Query the database for the previously specified layer id
    const data = await DB.query("SELECT * FROM layer WHERE layer_id = ?", [
      this.layer_id,
    ]);

    // Here, we can have zero or one Layers
    if (data.length === 1) {
      // If we found one, populate class variables
      this.name = data[0].name;
      this.color = data[0].color;
      this.icon = data[0].icon;
    } else {
      // If one was not found, throw an error
      throw "Layer not found.";
    }
  }

  get data() {
    return {
      id: this.layer_id,
      name: this.name,
      color: this.color,
      icon: this.icon,
    };
  }
}

module.exports = Layer;
