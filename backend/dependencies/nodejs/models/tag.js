/*
 * @Author: Adam Oberg
 * @Date:   Tuesday Aug 21th 2020
 * @Last Modified By:  Adam Oberg
 * @Last Modified Time:  Aug 21th 2020
 * @Copyright:  (c) Oregon State University 2020
 */
const DB = require("/opt/nodejs/test-sql-access.js");

class Tag {
  constructor(tag_id, name = null, img = null, description = null) {
    this.tag_id = tag_id;
    this.name = name;
    this.img = img;
    this.description = description;
  }

  addTag(tag_id) {
    this.tags.push(tag_id);
  }

  async download() {
    // Connect to the database
    await DB.connect();

    // Download this tag's data
    const data = await DB.query("SELECT * FROM tag WHERE tag_id = ?", [
      this.tag_id,
    ]);
    if (data.length === 1) {
      this.name = data[0].name;
      this.img = data[0].img;
      this.description = data[0].description;
    } else {
      throw "Tag not found.";
    }
  }

  get data() {
    return {
      id: this.tag_id,
      name: this.name,
      img: this.img,
      description: this.description,
    };
  }
}

module.exports = Tag;
