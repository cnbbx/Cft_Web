import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import History from '@/components/history'
import Checked from '@/components/checked'
import InputOrder from '@/components/inputorder'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/history', name: 'History', component: History },
        { path: '/checked', name: 'Checked', component: Checked },
        { path: '/inputorder', name: 'InputOrder', component: InputOrder }
    ]
})
