<!--
@Author: Adam Oberg <Adam>
@Date:   2019-03-26T12:15:39-07:00
@Email:  adam.oberg@oregonstate.edu
@Last modified by:   Adam
@Last modified time: 11/9/2020 12PM
-->
<template>
<div style="height: 100vh; overflow: hidden;">

  <!-- Side Menu or 'Key' -->
  <el-menu class='sideMenu' mode='vertical' backgroundColor='#1A1A1A'>
    <el-menu-item-group>
      <el-col class='buttonGroup'>
        <div class='colorByTitle'>Toggle Layers</div>
        <el-button class="sortButton" icon="el-icon-star-off" size="small" v-if="getLayers.length === 0" :loading="true">Loading...</el-button>
        <el-button class="sortButton" icon="el-icon-star-on" size="small" v-on:click="sideBarLayerToggleEvent" v-for="(layer, index) in getLayers" :key="index">{{ layer.name }}</el-button>
      </el-col>
    </el-menu-item-group>
  </el-menu>


  <!-- Map Code -->
  <div class="mapFrame">
    <l-map :style="mapStyle" :zoom="zoom" :center="center" ref='map' @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer> <!-- This is where the actual map layer comes from-->
      <l-geo-json v-for="(point, index) in getPoints" :key="index" :geojson="point.geoJSON" :options="pointOptions(point)">
      </l-geo-json>
    </l-map>
  </div>

  <!-- Sidebar -->
  <transition name='side'>
    <sideView ref='sideview' v-if='showSide' @hide='showSide = false' :point="getPoint(currentSideViewPointIndex)"></sideView>
  </transition>
</div>
</template>
<script>
// The order in which we load these leaflet files matters
// https://github.com/ghybs/leaflet-defaulticon-compatibility
import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import {
  LMap,
  LTileLayer,
  LGeoJson,
  LPolygon
} from 'vue2-leaflet'

import {
  mapGetters
} from 'vuex'

import sideView from '@/components/map/sideView'


// import Cluster from '../assets/clustering.js'

export default {
  name: 'mapComponent',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    sideView,
    LPolygon
  },
  data() {
    return {
      // Map attributions start
      zoom: 15.5,
      center: L.latLng(44.565, -123.2785),
      url: 'https://api.mapbox.com/styles/v1/jack-woods/cjmi2qpp13u4o2spgb66d07ci/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFjay13b29kcyIsImEiOiJjamg2aWpjMnYwMjF0Mnd0ZmFkaWs0YzN0In0.qyiDXCvvSj3O4XvPsSiBkA',
      bounds: null,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapStyle: 'height: 100vh width: 100%;',
      map: null,
      // Map attributions end
      clusterController: null,
      queryString: /.*/,
      currentSideViewPointIndex: null, // Type: Numeric index in points array
      showSide: false // Toggles the visibility of the sidebar
      // jsonOptions: {
      //   pointToLayer: (feature, latlng) => {
      //     var icon = L.Icon({
      //         options: {
      //             iconSize: [27, 27],
      //             iconAnchor: [13, 27],
      //             popupAnchor:  [1, -24],
      //             iconUrl: '@/public/images/resturant_icon.png'
      //         }
      //     });
      //     return L.CircleMarker(latlng, {
      //       color: feature.properties.color,
      //       opacity: 0.75,
      //       weight: 1,
      //       icon: icon,
      //       fillColor: feature.properties.color,
      //       fillOpacity: 0.45,
      //       radius: 5
      //     })
      //   }
      // }
    }
  },
  mounted() {
    this.$store.dispatch('downloadLayers')
    this.$store.dispatch('downloadPoints')
  },
  computed: {
    ...mapGetters([
      'getLayers',
      'getPoints',
      'getTags'
    ]),
    layers: () => this.getLayers.filter(layer => layer['layer_id'] === point['layer_id']),
  },
  methods: {
    // Map updaters
    boundsUpdated(bounds) {
      this.bounds = bounds
    },
    centerUpdated(center) {
      this.center = center
    },
    getPoint(index) {
          return this.getPoints[index]
    },
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    //This event toggles points on the map that do not share the same layer id
    // as the selected layer.
    sideBarLayerToggleEvent(e, layer) {
      console.log(e)

    },

    // This sets up/configures the events for a single leaflet map feature.
    // It is designed to be passed as the "onEachFeature" parameter of the
    // pointOptions object
    configureFeatureEvents(point, layer) {
      // Add click event handler
      layer.on('click', this.polygonClickHandler)
      // Add mouseover and mouseout event handlers
      layer.on('mouseover', e => {
        const pointData = this.getPoint(e.sourceTarget.options.susMapProperties.pointIndex)
        e.target.bindTooltip(pointData.name).openTooltip()
        // User for popup tooltip
        if (!e.target.setStyle) return
        e.target.oldStyle = {
          fillColor: e.target.options.fillColor,
          color: e.target.options.color
        }
        e.target.setStyle({
          fillColor: '#000',
          color: '#000'
        })
      })
      layer.on('mouseout', e => {
        if (!e.target.setStyle) return
        e.target.setStyle({
          ...e.target.oldStyle
        })
      })
    },

    pointOptions(point) {
      // Get the layer corresponding to this point
      const layers = this.getLayers.filter(layer => layer['layer_id'] === point['layer_id'])

      // If the layer is not found, use this default style
      let style = {
        weight: 2,
        color: '#000',
        opacity: 1,
        // iconurl: '@/public/images/resturant_icon.png',
        fillColor: '#000',
        fillOpacity: 0.7
      }

      // If a matching layer was found, overwrite the style variables with this layer's style
      if (layers.length > 0) {
        style.fillColor = layers[0].color
        style.color = layers[0].color
      }
      const susMapProperties = {
        pointIndex: point.index
      }

      // Return a leaflet options object
      return {
        susMapProperties,
        onEachFeature: this.configureFeatureEvents,
        style,
        // filter: You can add a function here to filter whether or not this displays on the map. Refer to the documentation.
        pointToLayer: function(geoJsonPoint, latlng) {
          if (point.layer_id > 0) {
            // If a matching layer was found, overwrite the icon variables with this layer's icon
            // By default, this returns:
            return new L.Marker(latlng, {
              icon: new L.Icon({
                iconSize: [27, 27],
                iconAnchor: [13, 27],
                popupAnchor: [1, -24],
                iconUrl: layers[0].icon
              }),
              susMapProperties,
            })
          }
          // otherwise, this returns:
          return new L.Marker(latlng, {
            icon: new L.Icon({
              iconSize: [27, 27],
              iconAnchor: [13, 27],
              popupAnchor: [1, -24],
              iconUrl: 'images/icon_icon.png'
            }),
            susMapProperties,
          })
        }
      }
    },
    polygonClickHandler(e) {
      this.currentSideViewPointIndex = e.sourceTarget.options.susMapProperties.pointIndex
      this.showSide = true
    }
  }
}
</script>

<style >
@import "../../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped lang='scss'>
//Fixed --nav-hight by addding the import above and scoped lang='scss'

$sideMenu-width: 250px;
.sideMenu {
    background-color: $--color-black;
    margin-top: $--nav-height;
    height: calc(100vh - 80px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2000;
    width: $sideMenu-width;
    padding-top: 1em;
}
.colorByTitle {
    color: $--color-white;
    font-size: 26px;
    text-align: center;
    font-family: 'stratumno2';
}
.mapFrame {
    margin-top: $--nav-height;
    height: 100%;
    width: 100%;
}
.sideMenu {
    display: flex;
    justify-content: center;
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
.toggleButton {}
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
.tooltip{

}
</style>
