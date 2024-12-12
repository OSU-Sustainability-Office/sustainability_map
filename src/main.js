import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elm from 'element-ui'
import Vuei18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/en'

import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
// The order in which we load these leaflet css files matters
// https://github.com/ghybs/leaflet-defaulticon-compatibility
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import '@/assets/leaflet-global-override.scss'

Vue.use(Vuei18n)
Vue.use(elm, { locale })

Vue.config.lang = 'en'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
