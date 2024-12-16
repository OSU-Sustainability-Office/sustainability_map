<!--
  Filename: navBar.vue
  Description: Navigation bar component vue file.
-->

<template>
  <el-row class="sus-nav" type="flex">
    <!--:span="8"-->
    <el-col class="sus-nav-item" :xs="9" :sm="7" :md="5" :lg="4" :xl="3">
      <svgLogo class="sus-nav-image" width="auto" alt="" @click="$router.push({ path: '/' })" />
    </el-col>
    <el-col class="sus-title sus-nav-item" :xs="11" :sm="13" :md="13" :lg="16" :xl="18">
      <h1>Sustainability Map</h1>
    </el-col>
    <!--
        Search functionality works via the following process:
          1. search bar change hits computed property "activeFeatures"
          2. activeFeatures returns GeoJSON features which match text in search query
          3. when a returned GeoJSON feature gets clicked we call a method
          4. the called method gets the referenced layer indexed by coordinates
          5. the method then calls the "popupopen" function & maybe clears input
      -->
    <el-col class="sus-nav-search sus-nav-item" :xs="2" :sm="2" :md="4" :lg="2" :xl="1">
      <el-dropdown size="large" placement="bottom-start">
        <el-input size="medium" class="sus-nav-search-input" placeholder="Search..." v-model="input">
          <i slot="suffix" class="el-input__icon el-icon-search"> </i>
        </el-input>

        <el-dropdown-menu slot="dropdown" v-if="activeFeatures.length === 0">
          <el-dropdown-item>No features found.</el-dropdown-item>
        </el-dropdown-menu>

        <el-dropdown-menu class="scroll-bar" slot="dropdown" v-else>
          <el-dropdown-item
            v-for="({ properties: { name, info, icon }, geometry: { coordinates } }, index) in activeFeatures"
            :key="index"
            @click.native="handleSelect(coordinates)"
          >
            <el-container class="result-container">
              <el-header>
                <div class="result-image">
                  <el-avatar
                    class="result-image"
                    size="small"
                    fit="scale-down"
                    :src="'images/categories/' + icon + '.png'"
                  >
                  </el-avatar>
                </div>
                <strong>{{ name }}: </strong>
              </el-header>
              <el-main class="result">
                {{ info }}
              </el-main>
            </el-container>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
import svgLogo from '../../public/images/logo.svg'
import { mapGetters } from 'vuex'

export default {
  name: 'navigbar',
  components: {
    svgLogo
  },
  data() {
    return {
      activeIndex: '',
      input: ''
    }
  },
  computed: {
    // Check which features get matched by input
    activeFeatures() {
      return this.searchFeatures(this.input)
    },
    ...mapGetters({
      searchFeatures: 'FeatureModule/searchFeatures',
      getLayer: 'LayerModule/getLayerByCoordinates'
    })
  },
  mounted() {
    this.activeIndex = this.$route.path.split('/')[1]
  },
  watch: {},
  methods: {
    // returns function which calls pop-up method
    handleSelect: function (coordinates) {
      // this.$router.push({ path: '/' + select })
      // this.activeIndex = select
      this.getLayer(coordinates).openPopup()
    }
  }
}
</script>
<style>
@import '../../node_modules/leaflet/dist/leaflet.css';
</style>

<style scoped lang="scss">
/* Adds scroll bar to drop-down menu */
.scroll-bar {
  max-height: 50vh;
  overflow-y: scroll;
  scrollbar-color: $--color-primary $--color-white;
  scrollbar-width: thin;
}

/* Search bar results in drop-down */
.result-container {
  width: 40vw;
  font-size: 14px;
}

@media only screen and (max-width: $--mobile-width) {
  .result-container {
    width: 42vw;
    margin: 0px;
    font-size: 10px;
    strong {
      font-size: 12px;
    }
    .el-header {
      margin-bottom: 20px;
    }
  }
  .el-dropdown-item {
    line-height: 12px;
  }
  .el-main {
    padding: 0px 20px;
  }
}

.el-header {
  line-height: 12px;
}

.result-image {
  margin-top: 0.25em;
  margin-right: 0.5em;
  padding-bottom: 0em;
}
.result {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h1 {
  text-align: center;
  color: $--color-white;
  font-size: 26px;
}

.sus-nav {
  background-color: $--color-primary !important;
  /*border-bottom: solid 1px $--color-white;*/
  display: flex;
  margin: inherit;
  width: 100%;
  height: 100%;
  padding-left: 2em;
  padding-right: 2em;
  overflow: hidden;
}

.sus-nav-image {
  height: 100%;
  justify-self: center;
  cursor: pointer;
  padding-top: 1px;
  padding-bottom: 1px;
}

.sus-nav-menu > * {
  padding-top: 5px;
  height: $--nav-height - 2px !important;
  color: $--color-white;
  border: none;
}
.el-menu-item {
  color: $--color-white !important;
  border: none !important;
  height: 100% !important;
}
.sus-nav-menu > *:not(.is-active):hover {
  color: $--color-black !important;
  background-color: rgba(0, 0, 0, 0) !important;
}
.sus-nav-menu > *.is-active {
  border-bottom: none !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: $--color-white !important;
}
.sus-nav-menu > *:not(.is-active):hover:after {
  content: '\a0';
  display: block;
  padding: 0 2px;
  line-height: 1px;
  border-bottom: 3px solid #000;
}
.sus-nav-sign {
  color: #ffffff !important;
  height: $--nav-height !important;
  line-height: $--nav-height !important;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 1.1em;
  text-overflow: ellipsis;
}

.sus-nav-sign:hover {
  color: #000000 !important;
  text-decoration: none;
}
.sus-title {
  font-size: $--font-size-large;
  font-family: StratumNo2;
  color: $--color-black;
  padding-top: 1.1em;
}

.sus-nav-search {
  padding-top: 1em;
  width: 15em;
  font-family: 'stratumno2';
}
.el-input__icon:hover {
  cursor: pointer;
}

/* Mobile Friendly Styling Adjustments */
@media only screen and (max-width: $--mobile-width) {
  .el-row.sus-nav {
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0;
  }

  .el-col.sus-nav-item {
    display: flex;
  }

  .sus-nav-image {
    height: 50px;
    width: 100%;
    padding: 0;
    margin: 0;
    align-self: center;
  }
  .sus-title {
    h1 {
      width: 100%;
      text-align: center;
      font-size: 16px;
    }
  }
  .sus-nav-search {
    font-size: 12px;
  }

  .el-col.sus-nav-item {
    align-self: center;
    padding: 0;
    margin: 0;
  }
}
</style>
