import { createRouter, createWebHistory } from 'vue-router'
import Autoparts from './views/Autoparts.vue'
import Components from './views/Components.vue'
import Autopart from './views/Autopart.vue'

export default createRouter({

    history: createWebHistory(),

    routes: [
        { path: '/', component: Autoparts },
        { path: '/components', component: Components },
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