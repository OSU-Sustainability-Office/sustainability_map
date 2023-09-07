<!--
  Filename: map.vue
  Description: The vue component showing the interactive map with the Sustainability Features.
-->
<template>
  <el-container class="mapContainer">
    <!-- Side Button -->
    <el-button class="sideButton" @click="showSide = !showSide">
      <i v-if="showSide" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </el-button>

    <!-- Side Menu or 'Key' -->
    <sideView :showSide="showSide"></sideView>

    <!-- The Map -->
    <el-main class="mapDisplay">
      <l-map
        :minZoom="minZoom"
        :max-bounds="maxBounds"
        :style="mapStyle"
        :zoom="zoom"
        :center="center"
        ref="map"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <button class="resetMapButton" @click="resetMap()">Reset Map</button>
        <!-- ported in from energy-dashboard repo-->
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <!-- This is where the actual map layer comes from-->
        <l-geo-json
          :geojson="getFeatures"
          :options="featureOptions"
        ></l-geo-json>
        <l-geo-json
          :geojson="getBuildings"
          :options="buildingOptions"
        ></l-geo-json>
      </l-map>
    </el-main>
  </el-container>
</template>
<script>
// The order in which we load these leaflet files matters
// https://github.com/ghybs/leaflet-defaulticon-compatibility
import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'

import { mapGetters } from 'vuex'

import sideView from '@/components/map/sideView'
import popUp from '@/components/map/popup'

import Vue from 'vue'
import elm from 'element-ui'
import Vuei18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(Vuei18n)
Vue.use(elm, { locale: locale })
Vue.config.lang = 'en'

export default {
  name: 'mapComponent',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    sideView
  },
  data () {
    return {
      // Map attributions start
      zoom: 15.5,
      minZoom: 14,
      center: L.latLng(44.5638, -123.2815),
      url: 'https://api.mapbox.com/styles/v1/jack-woods/cjmi2qpp13u4o2spgb66d07ci/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFjay13b29kcyIsImEiOiJjamg2aWpjMnYwMjF0Mnd0ZmFkaWs0YzN0In0.qyiDXCvvSj3O4XvPsSiBkA',
      bounds: null,
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapStyle: 'height: 100vh width: 100%;',
      map: null,
      maxBounds: L.latLngBounds([
        [44.5228, -123.3334],
        [44.605, -123.2071]
      ]),
      // Map attributions end
      clusterController: null,
      queryString: /.*/,
      currentSideViewPointIndex: null, // Type: Numeric index in points array
      buildingOptions: {
        // Adds tool-tips
        // !! NOTE: the tool tip styling override must be global so it's in in style-variables.scss
        onEachFeature: (
          {
            properties: {
              tags: { name }
            }
          },
          layer
        ) => {
          layer.bindTooltip(name, {
            // permanent: true,
            // direction: 'center'
          })

          // add tooltip layer to store for easy toggling
          this.$store.commit('LayerModule/addTooltip', layer)

          // code below ported over from energy-dashboard, allow you to see building tooltips by hovering mouse over, even when zoomed out
          layer.on('click', (e) => {
            this.polyClick(
              e.target.feature.properties.id,
              e.target.feature,
              layer.getBounds().getCenter()
            )
          })
          layer.on('mouseover', function (e) {
            if (!e.target.setStyle) return
            e.target.oldStyle = {
              fillColor: e.target.options.fillColor,
              color: e.target.options.color
            }
            e.target.setStyle({ fillColor: '#000', color: '#000' })
            e.target
              .bindTooltip(e.target.feature.properties.tags.name)
              .openTooltip()
          })
          layer.on('mouseout', (e) => {
            if (!e.target.setStyle) return
            e.target.setStyle({ ...e.target.oldStyle })
          })
        },
        style: {
          stroke: true,
          color: '#1A1A1A',
          opacity: 0.2,
          fillOpacity: 0.12,
          weight: 1,
          fill: true,
          fillColor: '#D73F09'
        }
      },
      showSide: true
    }
  },
  mounted () {
    // used for resetmap() function
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject
    })
  },
  computed: {
    ...mapGetters({
      getFeatures: 'FeatureModule/getFeatures',
      getBuildings: 'DecorativeFeatureModule/getBuildings'
    }),
    // returns appropriate leaflet geojson feature options.
    // link below contains detailed info about each function
    // https://leafletjs.com/reference-1.6.0.html#geojson-option
    featureOptions: function () {
      return {
        // slight potential confusion: pointToLayer takes in a GeoJSON feature
        // with the Leaflet class type "Point" but has all the same properties
        // as a GeoJSON feature
        pointToLayer: (feature, latlng) => {
          // another feature property is tour--may want to use later
          let { icon, name, info } = feature.properties
          if (icon === undefined) icon = 'general'

          const featureMarker = L.marker(latlng, {
            icon: L.icon({
              iconUrl: `images/categories/${icon}.png`,
              iconSize: [21, 21], // [27, 27],
              iconAncor: [13, 27],
              popupAnchor: [-20, -20]
              // className: (tour) ? 'tourDot' : ''
            }),
            keyboard: true,
            title: name,
            alt: info,
            riseOnHover: true,
            bubblingMouseEvents: true
          })
          // Dot flair for virtual-tour features
          /*
          if (tour) {
            console.log(latlng)
            const circleLat = latlng.lat + 0.00001
            const circleLng = latlng.lng + 0.00001
            featureMarker.on('add', (ev) => {
              const dot = L.circleMarker({ lat: circleLat, lng: circleLng }, {
                radius: 4,
                fillColor: 'blue',
                color: 'blue',
                className: 'dotFlair'
              })
              dot.addTo(ev.target._map)
              dot.bringToFront()
            })
          }
          */
          return featureMarker
        },
        onEachFeature: (feature, layer) => {
          // Add the pop-up visual
          layer.bindPopup(
            (layer) => {
              // Programmatically return popup component
              const popupElement = new Vue({
                ...popUp,
                parent: this,
                propsData: feature.properties
              }).$mount()
              return popupElement.$el
            },
            // pop-up options
            {
              maxWidth: 420,
              minWidth: 100,
              autoPan: true,
              autoPanPaddingTopLeft: 0,
              autoPanPaddingBottomRight: 0,
              keepInView: false,
              autoClose: true,
              closeOnClick: true,
              offset: L.point(20, 12)
            }
          )

          // Add layer to Vuex store (for searching)
          this.$store.commit('LayerModule/addLayer', {
            layer,
            coordinates: feature.geometry.coordinates
          })
        },
        // style: (feature) => {},
        // Function which determines whether to include
        filter: (feature) => {
          return true
        }
      }
    }
  },
  methods: {
    // Map updaters
    boundsUpdated (bounds) {
      this.bounds = bounds
    },
    centerUpdated (center) {
      this.center = center
    },
    getPoint (index) {
      return this.getPoints[index]
    },
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    // ported in from energy-dashboard repo
    resetMap () {
      this.map.setView(L.latLng(44.5638, -123.2815), 15.5)
    }
  }
}
</script>

<style>
@import "../../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped lang="scss">
/* Popup Styles */
.popup-item {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
}

.popup-head {
  font-weight: 500;
  font-size: 1.4em;
  padding: 0.5em;
}

.mapContainer {
  height: inherit;
  padding: 0;
  margin: 0;
}

.mapDisplay,
.side-view {
  padding: 0;
  margin: 0;
  height: inherit;
}

.el-button {
  font-family: "stratumno2";
  margin: 5px;
  width: 15em;
}
.buttonGroup {
  display: flex;
  color: $--color-white;
  font-family: "stratumno2";
  font-size: 13px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.toggleGroup {
  padding-top: 3em;
  display: flex;
  color: $--color-white;
  font-family: "stratumno2";
  font-size: 13px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.el-button.sideButton {
  z-index: 2000;
  width: 10px;
  margin: 0.7em 1em 0.25em 1em;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 2em;
}

/* Mobile Friendly Styling Adjustments */
@media only screen and (max-width: $--mobile-width) {
  .el-container.mapContainer {
    // moves the sideView above the map
    flex-direction: column;
  }

  .el-button.sideButton {
    margin-top: 0.1em;
    margin-left: 0.1em;
    margin-right: 0em;
    margin-bottom: 0em;
    left: 2.6em;
    // Make icon point up & down
    .el-icon-s-unfold,
    .el-icon-s-fold {
      transform: rotate(0.25turn);
    }
  }
}
.resetMapButton {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 95px;
  width: 90px;
  height: 50px;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
  border-radius: 4.5px;
  opacity: 1;
  justify-content: center;
  z-index: 500;
  cursor: pointer;
}
</style>
