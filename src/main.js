import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FirebaseVue from './firebase'
import './assets/scss/app.scss'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'

Vue.use(FirebaseVue)
Vue.use(VueTheMask)
Vue.use(money)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
