import Vue from 'vue'
import App from './App.vue'
import credentials from './credentials';
import VueGeolocation from 'vue-browser-geolocation'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueGeolocation)

import * as VueGoogleMaps from 'vue2-google-maps';

import router from './router';

Vue.use(VueGoogleMaps, {
  load: {
    key: credentials['google-api-key']
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
