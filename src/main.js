import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from "./util/http.js"
import 'lib-flexible'
import './assets/main.less'
import './assets/flex.less'
Vue.prototype.$http = http;
Vue.prototype.$store = store;
Vue.prototype.baseURL = 'https://bozunbaking.com/baking'
Vue.config.productionTip = false


document.addEventListener('UniAppJSBridgeReady', function() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});


