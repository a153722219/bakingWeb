import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import './assets/main.less'



Vue.config.productionTip = false


document.addEventListener('UniAppJSBridgeReady', function() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});


