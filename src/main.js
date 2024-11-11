import './style/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import i18n from './i18n/i18n'
import App from './App.vue'
import router from './router'

window.addEventListener("error", (e) => {
    console.log(e);
    console.error(e.message);
});

const app = createApp(App)

app.use(createPinia())
    .use(router)
    .use(ElementPlus)
    .use(i18n)
    .mount('#app')
