<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-26T12:15:39-07:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-27T17:30:21-07:00
-->
<template>
  <div style="height: 100vh; overflow: hidden;">
    <div class="mapFrame">
      <l-map :style="mapStyle"
        :zoom="zoom"
        :center="center"
        ref='map'
        v-loading="false"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      </l-map>
    </div>
  </div>
</template>


<script>
import L from 'leaflet'
// import { mapGetters } from 'vuex'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'
// import Cluster from '../assets/clustering.js'

export default {
  name: 'mapComponent',
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data () {
    return {
      zoom: 15.5,
      center: L.latLng(44.565, -123.2785),
      url: 'https://api.mapbox.com/styles/v1/jack-woods/cjmi2qpp13u4o2spgb66d07ci/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFjay13b29kcyIsImEiOiJjamg2aWpjMnYwMjF0Mnd0ZmFkaWs0YzN0In0.qyiDXCvvSj3O4XvPsSiBkA',
      bounds: null,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapStyle: 'height: 100vh width: 100%;',
      map: null,
      clusterController: null,
      queryString: /.*/,
      jsonOptions: {
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            color: feature.properties.color,
            opacity: 0.75,
            weight: 1,
            fillColor: feature.properties.color,
            fillOpacity: 0.45,
            radius: 5
          })
        }
      }
    }
  },
  mounted () {
  },
  created () {
    // this.clusterController = new Cluster()
    // this.$nextTick(() => {
    //   this.clusterController.addMap(this.$refs.map.mapObject)
    // })
    //
    // this.$eventHub.$on('updateClusters', () => {
    //   this.clusterController.updateClusterPoints()
    // })
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  }
}
</script>

<style scoped>
.mapFrame {
  padding-top: $--nav-height;
  height: 100%;
  width: 100%;
}
</style>
