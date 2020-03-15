import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import vuetify from './plugins/vuetify'

Vue.use(VueCookies)
const secure = process.env.NODE_ENV === 'production' ? true : false
Vue.$cookies.config('7d','','',secure)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
