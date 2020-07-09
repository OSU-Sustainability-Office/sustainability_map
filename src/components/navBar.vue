<!--
@Author: Brogan Miner <Brogan>
@Date:   2018-11-29T12:53:21-08:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-02-13T11:06:31-08:00
-->

<template>
    <el-row class='sus-nav'>
      <el-col :xs="9" :sm="7" :md="5" :lg="4" :xl="3">
        <img src="/images/logo.png" height=50 width=auto alt="" class='sus-nav-image' @click='$router.push({path: "/"})'>
      </el-col>
      <el-col :xs="13" :sm="15" :md="15" :lg="18" :xl="20">
      </el-col>
      <el-col :xs="2" :sm="2" :md="4" :lg="2" :xl="1">
      </el-col>
    </el-row>
</template>
<script>

export default {
  name: 'navigbar',
  components: {},
  data () {
    return {
      loginLink: 'https://api.sustainability.oregonstate.edu/v2/auth/login?returnURI=' + process.env.VUE_APP_HOST_ADDRESS + '/#/map',
      activeIndex: ''
    }
  },
  computed: {
    // ...mapGetters([
    //   'user'
    // ])
    onid: {
      get () {
        return this.$store.getters['user/onid']
      }
    }
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
    '$route.path': function (path) {
      this.activeIndex = path.split('/')[1]
      const buttons = [this.$refs.mapItem, this.$refs.buildingItem, this.$refs.dashboardItem]
      for (const item of buttons) {
        if (!item) {
          continue
        }
        if (this.activeIndex !== item.index) {
          item.$el.classList.remove('is-active')
        } else {
          item.$el.classList.add('is-active')
        }
      }
    }
  },
  methods: {
    logOut: function () {
      // this.$store.dispatch('logout')
    },
    handleSelect: function (select) {
      this.$router.push({ path: '/' + select })
      this.activeIndex = select
    }
  }
}
</script>
<style scoped lang='scss'>
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
  padding-top: ($--nav-height - 50) / 2;
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
</style>
