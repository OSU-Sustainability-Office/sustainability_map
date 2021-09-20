<!--
    Filename: popup.vue
    Description: Vue component for the feature pop-up windows
-->
<template>
  <div class="popup" ref="popup">
    <el-row type="flex" justify="center" v-show="image">
      <!--Pop-up Image-->
      <div ref='popupImage' class='popup-image'>
      </div>
    </el-row>
    <el-row class="title">
      <h2>{{name}}</h2>
    </el-row>
    <el-row>
      {{info}}
    </el-row>
    <el-row class='links-header title' v-if="tour || url">
      <h3>Additional links</h3>
    </el-row>
    <el-row class="links">
      <ul>
        <li v-if="tour"><h4><a :href="tour" target="_blank"><i class="el-icon-video-camera"></i>Virtual Tour</a></h4></li>
        <li v-if="url"><h4><a :href="url" target="_blank"><i class="el-icon-info"></i>Read More</a></h4></li>
      </ul>
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
    'imageType',
    'tour',
    'url',
    'isMobile'
  ],
  mounted: function () {
    this.$refs.popupImage.style.backgroundImage = `url(${this.image})`
    if (this.imageType) {
      this.$refs.popupImage.style.backgroundSize = this.imageType
    } else {
      this.$refs.popupImage.style.backgroundSize = 'cover'
    }
    if (this.isMobile) {
      // this.$refs.popup.
    }
  }
}
</script>

<style >
@import "../../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped lang="scss">

$--border-width: 0.4em;

.popup {
  border-width: $--border-width ($--border-width + 0.1) $--border-width ($--border-width + 0.1);
  border-color: $--color-primary;
  border-style: solid;
  border-radius: 6px;
  :first-child {
    padding: 0;
  }
  :not(:first-child) {
    padding: 10px;
  }
}

.popup-image {
  width:100%;
  height: 10em;
  border: none;
  filter:opacity(90%);
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  padding: 0;
}

$--text-padding: 6px;

.links {
  display: table;
  ul {
    li {
      display: inline-block;
      text-align: left;
      padding-right: $--text-padding;
      font-size: 14px;
      font-weight: 500;
      text-decoration: underline;
   }
 }
}

.links-header {
  margin-top: 5px;
}

.title {
  background-color: $--color-primary;
  /*
    On chrome there's a whitebox between the popup-border and background-color
    unless we set the margin to a negative value.  I don't know why "margin: 0"
    still displays a thin white border, but I'm assuming this is a some weird
    bug with webkit.
  */
  margin: -1px;
  h2 {
    font-weight: 600;
    color: white;
  }
  h3 {
    color:white;
  }
}

// Mobile Styling for Popup
@media only screen and (max-width: $--mobile-width) {
  .popup {
    max-width: 300px;
  }
}

</style>
