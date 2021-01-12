// default
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// pages
import Home from '@/pages/Home'
import Users from '@/pages/Users'
import NotFound from '@/pages/404'

// routing
export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
})
