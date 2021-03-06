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

  <!--<transition name="side">-->
    <!-- Side Menu or 'Key' -->
    <sideView :showSide=showSide></sideView>
  <!--</transition>-->

  <!-- The Map -->
  <el-main class="mapDisplay">
    <l-map :minZoom="minZoom" :max-bounds="maxBounds" :style="mapStyle" :zoom="zoom" :center="center" ref='map' @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer> <!-- This is where the actual map layer comes from-->
      <l-geo-json :geojson="getFeatures" :options="featureOptions"></l-geo-json>
      <l-geo-json :geojson="getBuildings" :options="buildingOptions"></l-geo-json>
    </l-map>
  </el-main>
</el-container>
</template>
<script>
// The order in which we load these leaflet files matters
// https://github.com/ghybs/leaflet-defaulticon-compatibility
import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import {
  LMap,
  LTileLayer,
  LGeoJson
} from 'vue2-leaflet'

import {
  mapGetters,
  mapMutations
} from 'vuex'

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
      center: L.latLng(44.565, -123.2785),
      url: 'https://api.mapbox.com/styles/v1/jack-woods/cjmi2qpp13u4o2spgb66d07ci/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFjay13b29kcyIsImEiOiJjamg2aWpjMnYwMjF0Mnd0ZmFkaWs0YzN0In0.qyiDXCvvSj3O4XvPsSiBkA',
      bounds: null,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapStyle: 'height: 100vh width: 100%;',
      map: null,
      maxBounds: L.latLngBounds([
        [44.5738, -123.2663],
        [44.5534, -123.3037]
      ]),
      // Map attributions end
      clusterController: null,
      queryString: /.*/,
      currentSideViewPointIndex: null, // Type: Numeric index in points array
      buildingOptions: {
        // Adds tool-tips
        // !! NOTE: the tool tip styling override must be global so it's in in style-variables.scss
        onEachFeature: ({ properties: { tags: { name } } }, layer) => {
          layer.bindTooltip(name, {
            permanent: true,
            direction: 'center'
          })

          // add tooltip layer to store for easy toggling
          this.$store.commit('LayerModule/addTooltip', layer)
        },
        style: {
          stroke: true,
          color: '#1A1A1A',
          opacity: 1.0,
          weight: 1,
          fill: true,
          fillColor: '#D73F09',
          fillOpacity: 0.2
        }
      },
      showSide: true
    }
  },
  mounted () {
    // this prevents the tooltips from being visible at initial page load
    this.$nextTick(function () {
      this.hideTooltips()
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
          let { category, name, info } = feature.properties
          if (category === undefined) category = 'general'

          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: `images/categories/${category}.png`,
              iconSize: [27, 27],
              iconAncor: [13, 27],
              popupAnchor: [-20, -20]
            }),
            keyboard: true,
            title: name,
            alt: info,
            riseOnHover: true
          })
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
          this.$store.commit('LayerModule/addLayer', { layer, coordinates: feature.geometry.coordinates })
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
      // toggle tool tips
      if (this.zoom > 16.5) {
        this.showTooltips()
      } else {
        this.hideTooltips()
      }
    },
    ...mapMutations({
      showTooltips: 'LayerModule/showTooltips',
      hideTooltips: 'LayerModule/hideTooltips'
    })
  }
}
</script>

<style >
@import "../../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped lang='scss'>
//Fixed --nav-hight by addding the import above and scoped lang='scss'

.el-button.sideButton {
  z-index: 2000;
  width: 10px;
  margin: 0.7em 1em 0.25em 1em;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 2em;
}

/* <transition> component styling */
.side-enter-active, .side-leave-active {
  transition: all 0.5s;
  transform: translate(-100%);
}
.side-enter-to {
  transform: translate(0%);
}

.side-leave-to {
  transform: translate(-100%);
}

/* Popup Styles */
.popup-item {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
}

.popup-head{
  font-weight: 500;
  font-size: 1.4em;
  padding: 0.5em;
}

.mapContainer {
  height: inherit;
  padding: 0;
  margin: 0;
}

.mapDisplay, .side-view {
  padding: 0;
  margin: 0;
  height: inherit;
}

.el-button {
    font-family: 'stratumno2';
    margin: 5px;
    width: 15em;

}
.buttonGroup {
    display: flex;
    color: $--color-white;
    font-family: 'stratumno2';
    font-size: 13px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.toggleGroup {
    padding-top: 3em;
    display: flex;
    color: $--color-white;
    font-family: 'stratumno2';
    font-size: 13px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>
