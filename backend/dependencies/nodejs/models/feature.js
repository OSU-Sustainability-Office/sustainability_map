/*
 * @Author: you@you.you
 * @Date:   Tuesday May 5th 2020
 * @Last Modified By:  Brogan Miner
 * @Last Modified Time:  Tuesday May 5th 2020
 * @Copyright:  (c) Oregon State University 2020
 */
const DB = require('/opt/nodejs/sql-access.js')
const Building = require('/opt/nodejs/models/building.js')
const Path = require('/opt/nodejs/models/path.js')

class Feature {
  constructor (id) {
    this.id = id
    this.description = ""
    this.coordinates = { lat: null, lng: null }
    this.images = []
  }

  setVariables(desc, lat, lng, images) {
    this.description = desc
    this.coordinates.lat = lat
    this.coordinates.lng = lng
    this.images = images
  }

  static async allExpanded() {
    await DB.connect("sus_map")
    let rows = await DB.query(`SELECT 
                                features.id feature_id,
                                features.description feature_desc,
                                features.coordinates feature_coords,
                                features.images feature_images,
                                buildings.name building_name,
                                buildings.map_id building_map_id,
                                buildings.description building_desc,
                                buildings.image building_image,
                                buildings.properties building_props,
                                p1.id path_id_b,
                                p2.id path_id_f,
                                p1.description path_desc_b,
                                p2.description path_desc_f,
                                p1.name path_name_b,
                                p2.name path_name_f
                              FROM features 
                                LEFT JOIN buildings ON features.building_id = buildings.id 
                                LEFT JOIN path_points AS pp1 ON pp1.feature_id = features.id
                                LEFT JOIN path_points pp2 ON pp2.building_id = buildings.id 
                                LEFT JOIN paths p1 ON p1.id = pp2.path_id 
                                LEFT JOIN paths p2 ON p2.id = pp1.path_id;`)
    let returnObject = {
      features: {},
      buildings: {},
      paths: {}
    }

    for (let row of rows) {
      let feature = new Feature(row.feature_id)

      feature.setVariables(row.feature_desc,
                           (row.feature_coords) ? JSON.parse(row.feature_coords).lat : null,
                           (row.feature_coords) ? JSON.parse(row.feature_coords).lng : null,
                           JSON.parse(row.feature_images))
      returnObject.features[row.feature_id] = feature

      if (row.building_map_id && !returnObject.buildings[row.building_map_id]) {
        let building = new Building(row.building_map_id)
        building.setVariables(row.building_name,
                              row.building_desc,
                              row.building_image,
                              JSON.parse(row.building_props))
        returnObject.buildings[row.building_map_id] = building
      }

      if (row.building_map_id) returnObject.buildings[row.building_map_id].addFeature(row.feature_id)

      if ((row.path_id_b || row.path_id_f)) {
        let path_id = (row.path_id_b) ? row.path_id_b : row.path_id_f
        if (!returnObject.paths[path_id]) {
          let path = new Path(path_id)
          let pathDesc = (row.path_desc_b) ? row.path_desc_b : row.path_desc_f
          let pathName = (row.path_name_b) ? row.path_name_b : row.path_name_f
          path.setVariables(pathName, pathDesc)
          returnObject.paths[path_id] = path
        }
        if (row.path_id_b) returnObject.paths[path_id].addBuilding(row.building_map_id)
        if (row.path_id_f) returnObject.paths[path_id].addFeature(row.feature_id)
      }
    }

    return returnObject
  }

  get
  data () {
    return {
      id: this.id,
      description: this.description,
      coordinates: this.coordinates,
      images: this.images
    }
  }

}

module.exports = Feature
