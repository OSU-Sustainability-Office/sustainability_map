<!--
  Filename: App.vue
  Description: The "main" vue app markup file.
-->

<template>
  <el-container>
    <el-header>
      <navigbar />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import navigbar from '@/components/navBar.vue'

export default {
  name: 'App',
  components: {
    navigbar
  },
  async created () {},
  data () {
    return {}
  },
  beforeDestroy () {},
  methods: {},
  watch: {}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@font-face {
  font-family: 'StratumNo2';
  /* !!NOTE: CHANGE THE PREFIX WHEN DEPLOYING ON DOMAIN NAME*/
  src: url('#{$font-path}StratumNo2-Bold.woff2') format('woff2'),
    url('#{$font-path}StratumNo2-Bold.woff') format('woff'), url('#{$font-path}StratumNo2-Bold.ttf') format('truetype'),
    url('#{$font-path}StratumNo2-Bold.svg#StratumNo2-Bold') format('svg');
  font-weight: bold;
  font-style: normal;
}
body {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="scss">
@use 'element-plus/theme-chalk/src/index.scss';
</style>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  margin: 0;
  padding: 0;
  /* We need the !important flag to override the prop el-header takes in for height as size
     This is sort of a limitation with using Elements-UI and scss variables.
  */
  height: $nav-size !important;
}

@media only screen and (max-width: $mobile-width) {
  .el-header {
    height: $nav-size-mobile !important;
  }
}

.el-main {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
