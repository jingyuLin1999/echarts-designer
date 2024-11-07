import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/echarts',
        name: 'echarts',
        component: () => import('@/demo/echarts')
    },
    {
        path: '/',
        name: 'design',
        component: () => import('@/demo/design')
    },
    {
        path: '/border',
        name: 'border',
        component: () => import('@/demo/border')
    },
    {
        path: '/navigation',
        name: 'navigation',
        component: () => import('@/demo/navigation')
    },
    {
        path: '/flexbox',
        name: 'flexbox',
        component: () => import('@/demo/flexbox')
    },
    {
        path: '/echart-3d',
        name: 'echart-3d',
        component: () => import('@/demo/echart-3d')
    }
]

const router = new VueRouter({
    // mode: 'history',
    routes
})

export default router