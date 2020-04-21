import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elm from 'element-ui'
import Vuei18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/en'

import 'element-ui/lib/theme-chalk/reset.css'
import '@/assets/style-variables.scss'

Vue.use(Vuei18n)
Vue.use(elm, { locale: locale })

Vue.config.lang = 'en'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
