import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import History from '@/components/History'
import Checked from '@/components/checked'
import InputOrder from '@/components/inputOrder'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/history', name: 'history', component: History },
        { path: '/checked', name: 'checked', component: Checked },
        { path: '/inputOrder', name: 'inputOrder', component: InputOrder }
    ]
})
