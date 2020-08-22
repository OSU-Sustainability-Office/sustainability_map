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
  <el-menu class='sideMenu' mode='vertical' backgroundColor='#1A1A1A' @select='handleSelect'>
    <div class='colorByTitle'>Group By:</div>
      <switchButtons :titles='["Category", "Energy Trend"]' v-model='grouping' />
      <el-menu-item-group v-if='grouping === "Category"'>
        <span slot='title' class='sideMenuGroupTitle'>Key</span>
        <el-tooltip content="Click to toggle visibility" placement="right">
          <el-menu-item index='Academics' :class="[(isDisplayed('Academics') ? 'active' : 'notactive')]"><span class='edu swatch'></span>Academics</el-menu-item>
        </el-tooltip>
        <el-menu-item index='Athletics & Rec' :class="[(isDisplayed('Athletics & Rec') ? 'active' : 'notactive')]"><span class='ath swatch'></span>Athletics & Rec</el-menu-item>
        <el-menu-item index='Dining' :class="[(isDisplayed('Dining') ? 'active' : 'notactive')]"><span class='din swatch'></span>Dining</el-menu-item>
        <el-menu-item index='Events & Admin' :class="[(isDisplayed('Events & Admin') ? 'active' : 'notactive')]"><span class='com swatch'></span>Events & Admin</el-menu-item>
        <el-menu-item index='Residence' :class="[(isDisplayed('Residence') ? 'active' : 'notactive')]"><span class='res swatch'></span>Residence</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group v-if='grouping === "Energy Trend"'>
        <span slot='title' class='sideMenuGroupTitle'>Key</span>
        <el-col class='trendBox'>
          <div class='trendGradient'>&nbsp;</div>
          <div class='trendTopLabel'>Reducing Energy <br> Usage</div>
          <div class='trendBottomLabel'>Increasing Energy <br> Usage</div>
        </el-col>
    <!-- <el-tooltip content="Click to toggle visibility" placement="right">
      <el-menu-item index='Down Trend' :class="[(isDisplayed('Down Trend') ? 'active' : 'notactive')]"><span class='down swatch'></span>Down Trend</el-menu-item>
    </el-tooltip>
    <el-menu-item index='Stable Trend' :class="[(isDisplayed('Stable Trend') ? 'active' : 'notactive')]"><span class='stable swatch'></span>Stable Trend</el-menu-item>
    <el-menu-item index='Up Trend' :class="[(isDisplayed('Up Trend') ? 'active' : 'notactive')]"><span class='up swatch'></span>Up Trend</el-menu-item> -->
      </el-menu-item-group>
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
        <l-geo-json v-for='(item, index) of queryFeatures(queryString)' :options='jsonOptions' :key='index' :geojson='item' ref="pointLayers"></l-geo-json>
        <l-geo-json v-for='(item, index) of queryBuildings(queryString)' :key='index' :geojson='item' ref="buildingLayers"></l-geo-json>

      </l-map>
    </div>
  </div>
</template>
    <!-- v-loading="!queryFeatures(queryString).length > 0 || !queryBuildings(queryString).length > 0" -->
<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'queryFeatures',
      'queryBuildings'
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
  height: calc(100% - 1em);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2000;
  width: $sideMenu-width;
  padding-top: 1em;
}
.mapFrame {
  margin-top: $--nav-height;
  height: 100%;
  width: 100%;
}
</style>
