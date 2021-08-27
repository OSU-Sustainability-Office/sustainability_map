<!--
  Filename: sideView.vue
  Description: The side-panel present on the map.
-->

<template>
  <!--transition name="side">-->
  <el-menu v-if="showSide" class='sideMenu' mode='vertical' backgroundColor='#1A1A1A'>
    <el-menu-item-group>
      <el-col>
        <div class='colorByTitle'>Toggle Features By Category</div>
        <br>
        <el-button class="sortButton" icon="el-icon-star-off" size="small" :loading="true" v-if="!tours.length">Loading...</el-button>
        <el-col>
          <el-row class="buttonGroup" :span="12" type="flex" justify="center">
            <span v-for="(category, index) in categories" :key="index" >
            <el-button v-if="visibleCategories.includes(category)" class="sortButton" icon="el-icon-star-on" size="small" @click="toggle(category)">
              {{category_dictionary[category]}}
            </el-button>
            <el-button v-else class="sortButton" icon="el-icon-star-off" size="small" @click="toggle(category)">
              {{category_dictionary[category]}}
            </el-button>
            </span>
          </el-row>
        </el-col>
      </el-col>
    </el-menu-item-group>
  </el-menu>
  <!--</transition>-->
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'sideView',
  props: {
    options: Array,
    showSide: Boolean
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
      category_dictionary: {
        rain: 'Stormwater',
        bike: 'Transportation',
        building: 'Building',
        dining: 'Dining',
        programs: 'Sustainable Programs',
        water: 'Water'
      }
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
    ...mapMutations({
      toggle: 'FeatureModule/toggleCategory'
    })
  },
  watch: {

  },
  async mounted () {}
}
</script>

<style >
@import "../../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped lang='scss'>

$sideMenu-width: 18.2em; //250px;

.buttonGroup {
  flex-direction: column;
  span {
    align-self: center;
  }
}

.sideMenu {
    background-color: $--color-black;
    width: $sideMenu-width;
    padding-top: 3em;
}
.colorByTitle {
    color: $--color-white;
    font-size: 26px;
    text-align: center;
    font-family: 'stratumno2';
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

.buttons > * {
    text-align: center;
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
  position: relative;
  left: 0.5em;
}

/* Mobile Friendly Styling Adjustments */
@media only screen and (max-width: $--mobile-width) {
  .sideMenu {
    width: 100%;
    margin: 0;
    padding: 3px;
  }

  .colorByTitle {
    color: $--color-white;
    font-size: 16px;
    text-align: center;
    font-family: 'stratumno2';
  }

  .buttonGroup {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sortButton {
    margin: 0.125em;
    padding: 1em;
    min-width:13em;
    text-align:left;
    font-size: 11px;
  }

  /*
  .buttonGroup .el-row {
    justify-content: flex-start;
  }
  */
}

</style>
