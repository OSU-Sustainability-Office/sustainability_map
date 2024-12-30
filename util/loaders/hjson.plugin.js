/*
  Filename: hjson.plugin.js
  Description: This is a "loader" script which converts .hjson files to .json during the build
               process.  This is so we can include comments in our feature.json files. This is
               a custom plugin used in the vite.config.js file.
*/

import Hjson from 'hjson'

function hjsonPlugin() {
  return {
    name: 'vite-plugin-hjson',
    transform(src, id) {
      if (id.endsWith('.hjson')) {
        const parsed = Hjson.parse(src)
        return {
          code: `export default ${JSON.stringify(parsed)}`,
          map: null
        }
      }
    }
  }
}

module.exports = hjsonPlugin
