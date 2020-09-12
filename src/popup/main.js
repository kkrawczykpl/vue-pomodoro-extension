import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'

Vue.use(Buefy)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  Buefy,
  render: h => h(App)
})
