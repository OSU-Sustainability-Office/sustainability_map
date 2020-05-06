/*
 * @Author: you@you.you
 * @Date:   Tuesday May 5th 2020
 * @Last Modified By:  Brogan Miner
 * @Last Modified Time:  Tuesday May 5th 2020
 * @Copyright:  (c) Oregon State University 2020
 */


class Path {
  constructor (id) {
    this.id = id
    this.description = ""
    this.name = ""
    this.features = []
    this.buildings = []
  }

  addBuilding (buildingId) {
    this.buildings.push(buildingId)
  }

  addFeature (featureId) {
    this.features.push(featureId)
  }

  setVariables(name, desc) {
    this.name = name
    this.description = desc
  }

  get
  data () {
    return {
      id: this.id,
      description: this.description,
      name: this.name,
      features: this.features,
      buildings: this.buildings
    }
  }
}

module.exports = Path
