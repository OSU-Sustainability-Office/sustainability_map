<!--
    Filename: popup.vue
    Description: Vue component for the feature pop-up windows
-->
<template>
  <div class="popup" ref="popup">
    <el-row type="flex" justify="center" v-show="image">
      <!--Pop-up Image-->
      <div ref="popupImage" class="popup-image"></div>
    </el-row>
    <el-row class="title">
      <h2>{{ name }}</h2>
    </el-row>
    <el-row>
      <div class="info" v-for="(line, index) of info.trim().split('\n')" :key="`line-${index}`">
        <p v-if="line.includes('<')" v-html="line.trim()"></p>
        <p v-else>{{ line.trim() }}</p>
      </div>
    </el-row>
    <el-row class="links-header title" v-if="tour || url">
      <h3>Additional links</h3>
    </el-row>
    <el-row class="links">
      <ul>
        <li v-if="tour">
          <VideoCamera class="link-icon" />
          <h4>
            <a :href="tour" target="_blank"><i class="el-icon-video-camera"></i>Virtual Tour</a>
          </h4>
        </li>
        <li v-if="url">
          <InfoFilled class="link-icon" />
          <h4>
            <a :href="url" target="_blank">Read More</a>
          </h4>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script setup>
// These need to be imported here because they are not recognized
// when created dynamically in map.vue with the new Vue 3 setup
import { InfoFilled, VideoCamera } from '@element-plus/icons-vue'
import { ElRow } from 'element-plus'
</script>

<script>
export default {
  name: 'popUp',
  components: {
    InfoFilled,
    VideoCamera,
    ElRow
  },
  props: ['name', 'info', 'tags', 'image', 'imageType', 'tour', 'url', 'isMobile'],
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
  },
  // use filter for text content (maybe)
  filters: {
    newlines: function (value) {
      return value.split('\n')
    }
  }
}
</script>

<style>
@import '../../../node_modules/leaflet/dist/leaflet.css';
</style>

<style scoped lang="scss">
$border-width: 0.4em;

.popup {
  border-width: $border-width ($border-width + 0.1) $border-width ($border-width + 0.1);
  border-color: $color-primary;
  border-style: solid;
  border-radius: 6px;
}

.el-row.content {
  white-space: pre;
}

.popup-image {
  width: 100%;
  height: 10em;
  border: none;
  filter: opacity(90%);
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  padding: 0;
}

$text-padding: 10px;

.links {
  display: table;
  ul {
    display: flex;
    padding-left: 1em;
    margin: 0;

    li {
      display: flex;
      text-align: left;
      padding-right: $text-padding;
      font-size: 14px;
      text-decoration: underline;

      a {
        font-weight: 100;
      }

      .link-icon {
        width: 1.2em;
        margin-right: 0.1em;
        padding-top: 0.1em;
        color: #0078a8;
      }
    }
  }
}

.links-header {
  margin-top: 5px;
  padding: 0;
}

.info {
  p {
    margin: 0;
    padding: 5px;
    word-spacing: 0.3em;
    line-height: 1.5;
  }
}

.title {
  h2 {
    background-color: $color-primary;
    color: white;
    margin: 0;
    padding: 0.1em;
    width: 100%;
  }
  h3 {
    color: white;
    background-color: $color-primary;
    font-weight: 100;
    margin: 0;
    padding: 0.1em;
    width: 100%;
  }
}

// Mobile Styling for Popup
@media only screen and (max-width: $mobile-width) {
  .popup {
    max-width: 300px;
    /* There's a small white space on the right side of the popup that this fixes */
    margin: -1px;
  }
}
</style>
