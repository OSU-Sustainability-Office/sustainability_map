<!--
    Filename: popup.vue
    Description: Vue component for the feature pop-up windows
-->
<template>
  <div>
    <el-row type="flex" justify="center" v-show="image">
      <el-image
        class="popup-image"
        :src="image"
        style="max-width:20em; max-height:20em;"
        alt="Outside the Kelly Engineering Center coming from Johnson Hall"
      ></el-image>
    </el-row>
    <el-row>
      <h2>{{name}}</h2>
    </el-row>
    <el-row>
      {{info}}
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'popUp',
  props: [
    'name',
    'info',
    'tags',
    'image'
  ]
}
</script>

<style >
@import "../../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped lang="scss">

.popup-image {
  border-width: 0.18em;
  border-style: solid;
  border-color:$--color-primary;
}

h2 {
    font-weight: 600;
    color: $--color-primary;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}

</style>
