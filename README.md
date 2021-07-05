# Sustainability Map
An interactive infographic map showing the sustainability features on campus! 

Note this uses Node version 14.

## Notes about the build process:

The source code (under `src`) gets automatically bundled by vue-cli (which uses webpack) into compact static assets under `public`, additional static assets dependent on outside sources (e.g. OSU building geometry from Open Street Maps) get created before the vue-cli webpack build via scripts under the `util` directory.  

but additionally static assets are built using scripts under `util`.

## Important References for development
 - [Overpass Turbo](https://overpass-turbo.eu/#)
 - [Overpass API](https://dev.overpass-api.de/overpass-doc/en/)
 - [GeoJSON specification](https://datatracker.ietf.org/doc/html/rfc7946)
 - [Leaflet GeoJSON Features](https://leafletjs.com/examples/geojson/)
 - [Leaflet Quickstart Guide](https://leafletjs.com/examples/quick-start/)
 - [Official Leaflet Docs](https://leafletjs.com/reference-1.6.0.html)
 - [Vue2Leaflet GitHub Page](https://github.com/vue-leaflet/Vue2Leaflet)
 - [Vue2Leaflet Docs](https://vue2-leaflet.netlify.app/quickstart/#accessing-leaflet-api)
 - [Vuex Store Docs](https://vuex.vuejs.org/)

## Installation Steps
- Fork this repo
- Change the package.json and backend/template.yaml to reflect correct project name
- ```npm install```
- Add code to the base to develop new application

### Other Notes
- No Travis script is in this repository, this may be added later. For now, just copy one out of an existing repo and make changes as necessary.
