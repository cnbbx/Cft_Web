// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import plugin from './plugin'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app', router, template: '<App/>', components: { App }
})

Vue.config.devtools = false
Vue.config.productionTip = false