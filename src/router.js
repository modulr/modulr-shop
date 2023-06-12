import { createRouter, createWebHistory } from 'vue-router'
import Autoparts from './views/Autoparts.vue'
import Store from './views/Store.vue'
import Autopart from './views/Autopart.vue'

export default createRouter({

    history: createWebHistory(),

    routes: [
        { path: '/:id?', component: Autoparts },
        { path: '/store', component: Store },
        { path: '/autopart/:id/:name?', component: Autopart, props: true }
    ],

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})