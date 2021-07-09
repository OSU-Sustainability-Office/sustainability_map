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
    <el-row class='links-header' v-if="tour || url">
      <h3>Additional links</h3>
    </el-row>
    <el-row type="flex" class="links">
      <el-col v-if="tour">
        <h4><a :href="tour" target="_blank">Virtual Tour</a></h4>
      </el-col>
      <el-col v-if="url">
        <h4><a :href="url" target="_blank">Read More</a></h4>
      </el-col>
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
    'image',
    'tour',
    'url'
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

$--text-padding: 6px;

.links {
 text-align: left;
 padding-right: $--text-padding;
 margin-top: 2px;
 font-size: 13px;
 font-weight: 500;
 text-decoration: underline;
}

.links-header {
  margin-top: 5px;
}

h2 {
    font-weight: 600;
    color: $--color-primary;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}

</style>
