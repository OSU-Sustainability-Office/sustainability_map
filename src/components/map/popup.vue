<!--
    Filename: popup.vue
    Description: Vue component for the feature pop-up windows
-->
<template>
  <div>
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
    'tags'
  ]
}
</script>
<style scoped>

h2 {
    font-weight: 600;
    color: #D73F09;
    padding-bottom: 0.5em;
}

</style>
