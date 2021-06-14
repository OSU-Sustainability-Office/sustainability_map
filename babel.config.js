/**
  Filename: babel.config.js
  Description: Babel config settings.
*/

module.exports = function (api) {
  api.cache(true)
  const presets = [
    '@vue/app'
  ]
  return {
    presets
  }
}
