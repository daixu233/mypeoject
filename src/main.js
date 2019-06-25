import Vue from 'vue'
import './cube-ui'
import 'normalize.css'
import './utils/rem'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
