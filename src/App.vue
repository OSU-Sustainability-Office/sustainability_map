<!--
  Filename: App.vue
  Description: The "main" vue app markup file.
-->

<template>
  <el-container id="app" class="app">
    <el-header class='header'>
      <navigbar />
    </el-header>
    <el-main class='main' ref='main'>
        <router-view />
    </el-main>
  </el-container>
</template>

<script>
import navigbar from '@/components/navBar'

export default {
  name: 'App',
  components: {
    navigbar
  },
  async created () {
  },
  data () {
    return {
      card: {
        name: 'foo'
      }
    }
  },
  beforeDestroy () {
  },
  methods: {
  },
  watch: {
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@font-face {
    font-family: 'StratumNo2';
    src: url('/fonts/StratumNo2-Bold.woff2') format('woff2'),
        url('/fonts/StratumNo2-Bold.woff') format('woff'),
        url('/fonts/StratumNo2-Bold.ttf') format('truetype'),
        url('/fonts/StratumNo2-Bold.svg#StratumNo2-Bold') format('svg');
    font-weight: bold;
    font-style: normal;
}
body {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang='scss'>
@import "~element-ui/packages/theme-chalk/src/index";
</style>

<style scoped lang='scss'>
@import '@/assets/style-variables.scss';

.app {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
}
.header {
  margin: 0;
  padding: 0;
  height: $--nav-height;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.main {
  position: absolute;
  top: 0;
  left: 0;
  min-height: calc(100% - #{$--nav-height});
  margin: 0;
  padding: 0;
  width: 100%;
}

</style>
