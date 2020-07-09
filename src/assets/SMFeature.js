/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-26T10:46:59-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-26T19:23:26-07:00
 */

import L from 'leaflet'

class SMFeature {
  constructor (name, items, color) {
    this.items = [] // { Name, description, geometry }
    this.name = name // string
    this.color = color
    for (let item of items) {
      this.addItem(item)
    }
  }

  addItem (item) {
    try {
      L.geoJSON(item)
      item.properties.color = this.color
      this.items.push(item)
    } catch (err) {
      // bad item
    }
  }

  queryItems (query) {
    if (this.name.match(query)) {
      return this.items
    }
    console.log(this)
    let queryReturn = []
    for (let item of this.items) {
      if (item.properties.Name.match(query) || (item.properties.description && item.properties.description.match(query))) {
        queryReturn.push(item)
      }
    }

    return queryReturn
  }
}

export default SMFeature
