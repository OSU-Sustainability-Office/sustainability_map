import L from 'leaflet'

class Cluster {
  constructor (bounds) {
    this.innerPoints = []
    this.bounds = bounds
    this.marker = null
  }

  createMarker () {
    const percObj = {}
    for (const p of this.innerPoints) {
      if (percObj[p.options.fillColor]) { percObj[p.options.fillColor] += 1 } else {
        percObj[p.options.fillColor] = 1
      }
    }
    let data = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" style="transform: rotate(-0.25turn)">'
    let cumpercent = 0
    for (const key of Object.keys(percObj)) {
      percObj[key] = (percObj[key] / this.innerPoints.length)
      const lastx = Math.cos(cumpercent * 2 * Math.PI)
      const lasty = Math.sin(cumpercent * 2 * Math.PI)
      cumpercent += percObj[key]
      const newx = Math.cos(cumpercent * 2 * Math.PI)
      const newy = Math.sin(cumpercent * 2 * Math.PI)

      const arc = (percObj[key] > 0.5) ? '1' : '0'
      data += '<path d="'
      data += 'M ' + lastx + ' ' + lasty + ' A 1 1, 0, ' + arc + ', 1, ' + newx + ', ' + newy + ' L 0 0"'
      data += ' fill="' + key + '" fill-opacity="0.8" />'
    }
    data += "<circle cx='0' cy='0' r='0.96' stroke-width='0.05' stroke='#000' fill-opacity='0' />"
    data += '</svg>'
    const formed = encodeURI('data:image/svg+xml,' + data).replace('#', '%23')
    const icon = L.icon({
      iconUrl: formed,
      iconSize: [20, 20],
      shadowUrl: ''
    })

    let avgLat = 0
    let avgLng = 0

    for (const point of this.innerPoints) {
      avgLat += point._latlng.lat
      avgLng += point._latlng.lng
    }

    avgLat /= this.innerPoints.length
    avgLng /= this.innerPoints.length
    this.marker = L.marker([avgLat, avgLng], { icon: icon })
    return this.marker
  }
}

class ClusterControl {
  constructor () {
    this.width = 20
    this.height = 20

    this.clusteringPoints = []

    this.removedPoints = []
    this.map = null
  }

  addMap (val) {
    if (!val) {
      return
    }
    this.map = val
    val.on('zoomend', (e) => { this.updateClusterPoints(e.target) })
    this.updateClusterPoints()
  }

  unitWidth () {
    return Math.abs((this.map.getBounds().getSouthEast().lng - this.map.getBounds().getNorthWest().lng) / this.width)
  }

  unitHeight () {
    return Math.abs((this.map.getBounds().getSouthEast().lat - this.map.getBounds().getNorthWest().lat) / this.height)
  }

  addPointToCluster (point) {
    const maxIndex = this.width * this.height
    const ver = Math.round(Math.abs((point._latlng.lat - this.map.getBounds().getNorthWest().lat)) / this.unitHeight())
    const hor = Math.floor(Math.abs((point._latlng.lng - this.map.getBounds().getNorthWest().lng)) / this.unitWidth())
    if ((hor * this.width) + ver < maxIndex) {
      this.clusteringPoints[(hor * this.width) + ver].innerPoints.push(point)
    }
  }

  displayClusters () {
    for (var cluster of this.clusteringPoints) {
      if (cluster.innerPoints.length > 1) {
        for (const point of cluster.innerPoints) {
          this.map.removeLayer(point)
          this.removedPoints.push(point)
        }
        cluster.createMarker().addTo(this.map)
      }
    }
  }

  clearClusteringPoints () {
    for (var cluster of this.clusteringPoints) {
      if (cluster.marker) {
        this.map.removeLayer(cluster.marker)
        cluster.marker = null
      }
    }
    this.clusteringPoints = []
  }

  updateClustersInPoints () {
    for (const  point of Object.values(this.map._layers)) {
      if (point._latlng) {
        this.addPointToCluster(point)
      }
    }
  }

  updateClusterPoints () {
    if (!this.map) {
      return
    }
    var unitWidth = this.unitWidth()
    var unitHeight = this.unitHeight()
    this.clearClusteringPoints()
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cluster = new Cluster([[this.map.getBounds().getNorthWest().lat - unitHeight * x, this.map.getBounds().getNorthWest().lng + unitWidth * y], [this.map.getBounds().getNorthWest().lat - unitHeight * (x + 1), this.map.getBounds().getNorthWest().lng + unitWidth * y], [this.map.getBounds().getNorthWest().lat - unitHeight * (x + 1), this.map.getBounds().getNorthWest().lng + unitWidth * (y + 1)], [this.map.getBounds().getNorthWest().lat - unitHeight * x, this.map.getBounds().getNorthWest().lng + unitWidth * (y + 1)]])
        this.clusteringPoints.push(cluster)
      }
    }
    for (var rPoint of this.removedPoints) {
      rPoint.addTo(this.map)
    }
    this.updateClustersInPoints()
    this.displayClusters()
  }
}

export default ClusterControl
