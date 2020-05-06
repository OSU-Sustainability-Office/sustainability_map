/*
 * @Author: you@you.you
 * @Date:   Tuesday May 5th 2020
 * @Last Modified By:  Brogan Miner
 * @Last Modified Time:  Tuesday May 5th 2020
 * @Copyright:  (c) Oregon State University 2020
 */


class Building {
  constructor (mapId) {
    this.mapId = mapId
    this.name = ""
    this.properties = {}
    this.image = ""
    this.description = "" 
    this.features = []
  }

  addFeature (featureId) {
    this.features.push(featureId)
  }

  setVariables(name, desc, image, props) {
    this.name = name
    this.description = desc
    this.image = image
    this.properties = props
  }

  get
  data () {
    return {
      id: this.mapId,
      name: this.name,
      properties: this.properties,
      image: this.image,
      description: this.description,
      features: this.features
    }
  }
}

module.exports = Building
