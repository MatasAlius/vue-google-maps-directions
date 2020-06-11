import Vue from 'vue'
import App from './App.vue'
import credentials from './credentials';

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
