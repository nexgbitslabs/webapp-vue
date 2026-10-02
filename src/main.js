import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'aos/dist/aos.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import '@splidejs/splide/dist/css/splide.min.css'

import vuetify from './plugins/vuetify'
// import { loadFonts } from './plugins/webfontloader'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Toast from 'vue-toastification'
import '@/disttoast/index.css'

import AOS from 'aos'

const app = createApp(App)
AOS.init()
app.use(createPinia())

app.use(router)
app.use(
  Toast,
  {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  }
)

app.use(vuetify)

app.mount('#app')
