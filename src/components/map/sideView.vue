<!--
@Author: Adam Oberg <Adam>
@Date:   9/14/2020
@Email:  adam.oberg@oregonstate.edu
@Last modified by:   Adam
@Last modified time: 9/14/2020 T 12:30 PM
-->

<template>
<el-row class='stage'>
  <el-row class='main'>
    <el-row class="title">
      <div class="media" ref='media'></div>
      <el-col :span='23'>{{ point.name }}</el-col>
      <el-col :span='1' class='close-box'><i class="fas fa-times" @click="hide()"></i></el-col>
    </el-row>
    <el-row>
      <el-col :span='24' v-loading='point ? false : true'>
        <div class="media" ref='media'></div>
      </el-col>
    </el-row>
  </el-row>
</el-row>
</template>

<script>
export default {
  name: 'sideView',
  props: [],
  components: {
  },
  data() {
    return {
      api: process.env.VUE_APP_ROOT_API,
      title: '',
      unit: 'day',
      int: 1,
      index: 0
    }
  },
  computed: {
    media: {
      get() {
        return this.point.img
      }
    },
    building: {
      get() {
        return this.$store.getters['map/point'](this.$store.getters['getPoint'].id)
      }
    }
  },
  methods: {
    hide: function() {
      this.$emit('hide')
    },
    next: function() {
      if (this.index + 1 >= this.buildingBlocks.length) {
        return
      }
      this.index++
    },
    prev: function() {
      if (this.index - 1 < 0) {
        return
      }
      this.index--
    }
  },
  watch: {

  },
  async mounted() {}
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
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-bottom: solid 1px #fff;
}

.inline {
    margin-right: 20px;
    transition: transform 1s;
    display: inline-block;
    flex-shrink: 0;
}
.graphslide {
    position: absolute;
    color: rgba($--color-white, 0.4);
    bottom: 220px;
    font-size: 3em;
    width: 100%;
    left: 0;
    z-index: 4;
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
