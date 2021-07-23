/*
    Filename: building.geometry.js
    Description: builds OSU Building geojson geometry from OSM overpass API
*/

const axios = require('axios')
const osmtogeojson = require('osmtogeojson')
const fs = require('fs')
const path = require('path')

// Query selects all OSU university buildings @ corvallis
const overpass_query = '[out:json];(way["name"]["leisure"!~".*"]["landuse"!~".*"](area:2922709422);node(w););out;'
const overpass_api = 'https://lz4.overpass-api.de/api/interpreter'

// Downloads JSON OSM features and converts them to GeoJSON
async function DownloadBuildingFeatures (query, api) {
  const result = await axios({
    method: 'get',
    url: api,
    data: query,
    headers: {
      Accept: 'application/json'
    },
    transformResponse: [function (data) {
      return osmtogeojson(JSON.parse(data), { flatProperties: false })
    }]
  })

  return result.data
}

console.log('Downloading data from Open Street Maps...')
DownloadBuildingFeatures(overpass_query, overpass_api)
  .then(data => {
    // Remove excess points
    data.features = data.features.filter(feat => feat.geometry.type === 'Polygon')

    const parent_dir = __dirname.split(path.sep).slice(0, -2).join(path.sep)
    const filename = path.join(parent_dir, 'src', 'assets', 'GeoJSON', 'building_features.json')
    fs.writeFileSync(filename, JSON.stringify(data))
    console.log(`Data written to ${filename}`)
  })
  .catch(err => {
    console.error(err)
    process.exit(2)
  })
