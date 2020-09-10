<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-26T12:15:39-07:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-27T17:30:21-07:00
-->
<template>
  <div style="height: 100vh; overflow: hidden;">

    <!-- Side Menu or 'Key' -->
  <el-menu class='sideMenu' mode='vertical' backgroundColor='#1A1A1A'>
       <el-menu-item-group>
         <el-col class='buttonGroup'>
           <div class='colorByTitle'>Select Layer</div>
           <el-button class="sortButton" icon="el-icon-star-off" size="small" v-if="getLayers.length === 0" :loading="true">Loading...</el-button>
           <el-button class="sortButton"  icon="el-icon-star-on" size="small" v-for="(layer, index) in getLayers" :key="index">{{ layer.name }}</el-button>
         </el-col>
         <el-col class='toggleGroup'>
           <div class='colorByTitle'>Toggle Options</div>
           <el-button class="toggleButton" icon="el-icon-check" size="small" >Bottle-Refil Stations</el-button>
           <el-button class="toggleButton" icon="el-icon-check" size="small" >Bike Lockers</el-button>
           <el-button class="toggleButton" icon="el-icon-check" size="small" >Buildings</el-button>

         </el-col>
       </el-menu-item-group>
    </el-menu>

     <!-- Map Code -->
    <div class="mapFrame">
      <l-map :style="mapStyle"
        :zoom="zoom"
        :center="center"
        ref='map'

        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer> <!-- This is where the actual map layer comes from-->
        <!-- <l-geo-json v-for="(point, index) in getPoints" :key="index" :geojson="point.geoJSON"></l-geo-json> -->
        <l-polygon v-for="(point, index) in getPoints" :key="index" :lat-lngs="point.geoJSON.elements.map(coords => ([coords.lat, coords.lon])).filter(coords => coords[0] && coords[1])"></l-polygon>
      </l-map>
    </div>
  </div>
</template>
<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
import { LMap, LTileLayer, LGeoJson, LPolygon } from 'vue2-leaflet'

// import Cluster from '../assets/clustering.js'

export default {
  name: 'mapComponent',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LPolygon
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
    console.log(process.env.VUE_APP_ROOT_API)
    this.$store.dispatch('downloadLayers')
    this.$store.dispatch('downloadPoints')
  },
  computed: {
    ...mapGetters([
      'getLayers',
      'getPoints',
      'getTags'
    ])
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
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    }
  }
}
</script>

<style >
@import "../../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped lang='scss'> //Fixed --nav-hight by addding the import above and scoped lang='scss'

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
.colorByTitle{
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
.sideMenu{
  display: flex;
}
.el-button{
  font-family: 'stratumno2';
  margin: 5px;
  width: 15em;
}
.buttonGroup{
  display: flex;
  color: $--color-white;
  font-family: 'stratumno2';
  font-size: 13px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.toggleButton{

}
.toggleGroup{
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
