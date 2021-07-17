import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/echarts',
        name: 'echarts',
        component: () => import('@/pages/echarts')
    },
    {
        path: '/',
        name: 'design',
        component: () => import('@/pages/design')
    }
]

const router = new VueRouter({
    // mode: 'history',
    routes
})

export default router