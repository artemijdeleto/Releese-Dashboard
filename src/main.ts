import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import store from './store'
import router from './router'
// import cookie from './cookie.js'
// import './assets/css/style.scss'
import './assets/css/index.scss'
import * as theme from "./theme";

theme.initialize();

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);

app.mount('#app');
