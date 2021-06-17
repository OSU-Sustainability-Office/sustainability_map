<!--
  Filename: sideView.vue
  Description: The side-panel present on the map.
-->

<template>
  <transition name="side">
  <el-menu v-if="showSide" class='sideMenu' mode='vertical' backgroundColor='#1A1A1A'>
    <el-row type="flex" justify="end">
        <el-button class="sideButton" @click="showSide = false" icon="el-icon-s-fold"></el-button>
    </el-row>
    <el-menu-item-group>
      <el-col class='buttonGroup'>
        <div class='colorByTitle'>Toggle Features By Category</div>
        <br>
        <el-button class="sortButton" icon="el-icon-star-off" size="small" :loading="true" v-if="!tours.length">Loading...</el-button>
        <el-col>
          <el-row :span="12" type="flex" justify="center" v-for="(category, index) in categories" :key="index" >
            <el-button v-if="visibleCategories.includes(category)" class="sortButton" icon="el-icon-star-on" size="small" @click="toggle(category)">
              {{category}}
            </el-button>
            <el-button v-else class="sortButton" icon="el-icon-star-off" size="small" @click="toggle(category)">
              {{category}}
            </el-button>
          </el-row>
        </el-col>
      </el-col>
    </el-menu-item-group>
  </el-menu>
  <el-menu v-else class='sideMenu' mode='vertical'>
    <el-menu-item-group>
      <el-row type="flex" justify="end">
        <el-button class="sideButton" icon="el-icon-s-unfold" @click="showSide = true"></el-button>
      </el-row>
    </el-menu-item-group>
  </el-menu>
  </transition>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'sideView',
  props: {
    options: Array
  },
  components: {
  },
  data () {
    return {
      api: process.env.VUE_APP_ROOT_API,
      title: '',
      unit: 'day',
      int: 1,
      index: 0,
      image: '@/assets/logo.png',
      showSide: true // Toggles the visibility of the sidebar
    }
  },
  computed: {
    media: {
      get () {
        return this.point.img
      }
    },
    ...mapGetters({
      categories: 'FeatureModule/getCategories',
      tours: 'FeatureModule/getTourNames',
      visibleCategories: 'FeatureModule/getVisibleCategories'
    })
  },
  methods: {
    hide: () => {
      console.log('hide called')
      this.showSide = false
    },
    show: () => {
      this.showSide = true
    },
    ...mapMutations({
      toggle: 'FeatureModule/toggleCategory'
    })
  },
  watch: {

  },
  async mounted () {}
}
</script>
<style scoped lang='scss'>

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
.stage {
    z-index: 401;
    display: block;
    position: absolute;
    left: 100%;
    top: 15%;
    width: 450px !important;
    margin-left: -470px;
    height: 85% !important;
}
.main {
    padding: 0;
    border-radius: 5px;
    overflow: hidden;
    background-color: rgb(26,26,26);
    box-shadow: -1px 1px 6px rgba(0,0,0,0.6);
}
.title {
    padding: 0.3em 0.8em;
    font-size: 32px;
    height: auto;
    background-color: rgb(215,63,9);
    color: #FFF;
    font-family: 'StratumNo2';
    border-bottom: solid 1px #fff;
}
.close-box {
    cursor: pointer;
}
.media {
    height: 150px;
    width:450px;
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
    background-position: center;
    border-bottom: solid 1px #fff;
}

.inline {
    margin-right: 20px;
    transition: transform 1s;
    display: inline-block;
    flex-shrink: 0;
}
.infoslide {
    background-color: $--color-white;
    bottom: 220px;
    font-size: 2em;
    font-family: 'StratumNo2';
    width: 100%;
    height: 300px;
}

.buttons > * {
    text-align: center;
}
.bigButton {
    background-color: $--color-black;
    color: darken($--color-white, 30%);
    border-color: darken($--color-white, 30%);
    width: 98%;
}
.bigButton:hover {
    background-color: #000;
    color: $--color-white;
    border-color: $--color-white;
}
.bigButton:active {
    background-color: $--color-black;
    color: $--color-white;
    border-color: $--color-white;
}

.sortButton {
  margin: 0.25em;
  padding: 1em;
  min-width:15em;
  text-align: left;
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

.sideButton {
  z-index: 2000;
  width: 1em;
  margin: 0em 1em 0.25em 1em;
  display: flex;
  justify-content: center;
}

</style>
