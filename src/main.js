import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

window['app'] = new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')
