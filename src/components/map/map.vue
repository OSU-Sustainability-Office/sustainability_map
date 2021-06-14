<!--
  Filename: map.vue
  Description: The vue component showing the interactive map with the Sustainability Features.
-->
<template>
<div style="height: 100vh; overflow: hidden;">

  <!-- Side Menu or 'Key' -->
  <!--
    Include component here later
  -->
  <!-- Map Code -->
  <div class="mapFrame">
    <l-map :style="mapStyle" :zoom="zoom" :center="center" ref='map' @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer> <!-- This is where the actual map layer comes from-->
      <!--
      <l-geo-json v-for="(point, index) in getPoints" :key="index" :geojson="point.geoJSON" :options="pointOptions(point)">
      </l-geo-json>
      -->
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

export default {
  name: 'mapComponent',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    sideView,
    LPolygon
  },
  data () {
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
    }
  },
  mounted () {
    // this.$store.dispatch('downloadLayers')
    // this.$store.dispatch('downloadPoints')
  },
  computed: {
    ...mapGetters([
      'getLayers',
      'getPoints',
      'getTags'
    ])
    // layers: () => this.getLayers.filter(layer => layer.layer_id === point.layer_id),
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
