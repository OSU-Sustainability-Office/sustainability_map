import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createI18n } from 'vue-i18n'

// The order in which we load these leaflet css files matters
// https://github.com/ghybs/leaflet-defaulticon-compatibility
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import '@/assets/leaflet-global-override.scss'

const i18n = createI18n({
  locale: 'en',
  messages: {}
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
app.use(ElementPlus)

// register all Element Plus icons globally
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
