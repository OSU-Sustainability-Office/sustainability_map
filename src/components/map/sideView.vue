<!--
  Filename: sideView.vue
  Description: The side-panel present on the map.
-->

<template>
<el-row class='stage'>
  <el-row class='main'>
    <el-row class="title">
      <el-col :span='23'>{{point.name}}</el-col>

      <el-col :span='1' class='close-box'><i class="fas fa-times" @click="hide()"></i></el-col>
    </el-row>
    <el-image class="media" :src="image"> </el-image>
    <el-row>
        <el-col class="infoslide" :span='24'>{{point.description}}</el-col>
    </el-row>
  </el-row>
</el-row>
</template>

<script>
export default {
  name: 'sideView',
  props: {
    point: Object
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
      image: '@/assets/logo.png'
    }
  },
  computed: {
    media: {
      get () {
        return this.point.img
      }
    }
  },
  methods: {
    hide: function () {
      this.$emit('hide')
    }
  },
  watch: {

  },
  async mounted () {}
}
</script>
<style scoped lang='scss'>
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
</style>
