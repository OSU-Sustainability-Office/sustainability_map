<!--
  Filename: navBar.vue
  Description: Navigation bar component vue file.
-->

<template>
    <el-row class='sus-nav' type="flex">
      <el-col :xs="9" :sm="7" :md="5" :lg="4" :xl="3">
        <svgLogo width=auto alt="" class='sus-nav-image' @click='$router.push({path: "/"})'/>
      </el-col>
      <el-col class="sus-title" :xs="11" :sm="13" :md="13" :lg="16" :xl="18">
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
      <el-col class='sus-nav-search' :xs="2" :sm="2" :md="4" :lg="2" :xl="1">
        <!--
          TODO:
            > Fix Drop Down Item Styling
            > Add event listener to open pop-up
        -->
        <el-dropdown size="large" placement="bottom-start">
          <el-input size='medium' class='sus-nav-search-input' placeholder="Search..." v-model="input">
            <i slot="suffix" class="el-input__icon el-icon-search"> </i>
          </el-input>

          <el-dropdown-menu slot="dropdown" v-if="activeFeatures.length === 0">
           <el-dropdown-item>No features found.</el-dropdown-item>
          </el-dropdown-menu>

          <el-dropdown-menu class="scroll-bar" slot="dropdown" v-else>
            <el-dropdown-item v-for="({properties: {name, info, category}}, index) in activeFeatures" :key="index">
              <el-container class="result">
               <el-header>
                 <el-avatar></el-avatar> <strong>{{name}}: </strong>
               </el-header>
               <el-main>
                {{info}}
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
import {
  mapGetters
} from 'vuex'

export default {
  name: 'navigbar',
  components: {
    svgLogo
  },
  data () {
    return {
      loginLink: 'https://api.sustainability.oregonstate.edu/v2/auth/login?returnURI=' + process.env.VUE_APP_HOST_ADDRESS + '/#/map',
      activeIndex: '',
      input: ''
    }
  },
  computed: {
    onid: {
      get () {
        return this.$store.getters['user/onid']
      }
    },
    // Check which features get matched by input
    activeFeatures () {
      return (this.searchFeatures)(this.input)
    },
    ...mapGetters({
      searchFeatures: 'FeatureModule/searchFeatures'
    })
  },
  created () {
    // this.$store.dispatch('user/user').then( user => {
    //   console.log(user)
    //   this.user = user
    // })
  },
  mounted () {
    this.activeIndex = this.$route.path.split('/')[1]
  },
  watch: {

  },
  methods: {
    logOut: function () {
      // this.$store.dispatch('logout')
    },
    handleSelect: function (select) {
      // this.$router.push({ path: '/' + select })
      // this.activeIndex = select
    }
  }
}
</script>
<style >
@import "../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped lang='scss'>

/* Adds scroll bar to drop-down menu */
.scroll-bar {
  max-height: 50vh;
  overflow-y: scroll;
  scrollbar-color: $--color-primary $--color-white;
  scrollbar-width: thin;
}

.result {
  font-size: 12px;
  max-width: 50vw;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

h1 {
  text-align: center;
  color: $--color-white;
  font-size: 26px;
}

.sus-nav {
  background-color: $--color-primary !important;
  border-bottom: solid 1px $--color-white;
  height: $--nav-height !important;
  z-index: 2000;
  padding-left: 2em;
  padding-right: 2em;
  overflow: hidden;
}
.sus-nav-image {
  //padding-top: ($--nav-height - 50) / 2;
  padding-top: 1px;
  padding-bottom: 1px;
  height: $--nav-height - 2px;
  cursor: pointer;
}
.sus-nav-menu {
  height: $--nav-height !important;
  border: none !important;
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
  background-color: rgba(0,0,0,0) !important;
}
.sus-nav-menu > *.is-active {
  border-bottom: none !important;
  background-color: rgba(0,0,0,0.3) !important;
  color: $--color-white !important;
}
.sus-nav-menu > *:not(.is-active):hover:after {
  content: "\a0";
  display: block;
  padding: 0 2px;
  line-height: 1px;
  border-bottom: 3px solid #000;
}
.sus-nav-sign {
  color: #FFFFFF !important;
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
.sus-title{
  font-size: $--font-size-large;
  font-family: StratumNo2;
  color: $--color-black;
  padding-top: 1.1em;
}
.sus-nav-search{
  padding-top: 1em;
  width: 15em;
  font-family: 'stratumno2';
}
.el-input__icon:hover{
  cursor: pointer;
}
</style>
