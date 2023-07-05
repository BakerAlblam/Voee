import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from "@tanstack/vue-query";
import './index.css'




const app = createApp(App)
app.use(VueQueryPlugin)
app.use(router)

app.mount('#app')
