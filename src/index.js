import Vue from 'vue'

// Silence vue-devtools recommendation
Vue.config.devtools = true

// Silence annoying production tip
Vue.config.productionTip = false

import App from './app.vue'

// Start the app, specifying the router and the initial element to mount App on
new Vue(Object.assign({
    el: '#app'
}, App))
