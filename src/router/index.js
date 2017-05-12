import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import History from '@/components/History'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/history', name: 'history', component: History },
        { path: '/test', name: 'test', component: Test }
    ]
})
