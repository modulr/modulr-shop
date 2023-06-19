import { createRouter, createWebHistory } from 'vue-router'
import Autoparts from './views/Autoparts.vue'
import Components from './views/Components.vue'
import Autopart from './views/Autopart.vue'
import NotFound from './views/404.vue'

export default createRouter({

    history: createWebHistory(),

    routes: [
        { path: '/', component: Autoparts },
        { path: '/components', component: Components },
        { path: '/autopart/:id/:name?', component: Autopart, props: true },
        { path: '/login', component: Components, beforeEnter(to, from, next) {
            window.location.href = "http://app.autoglobal.mx";
        }},
        { path: '/api/autoparts/mercado/auth', component: Components, beforeEnter(to, from, next) {
            window.location.href = "https://app.autoglobal.mx/api/autoparts/mercado/auth";
        }},
        { path: '/api/autoparts/mercado/notifications', component: Components, beforeEnter(to, from, next) {
            window.location.href = "https://app.autoglobal.mx/api/autoparts/mercado/notifications";
        }},
        { path: '/:pathMatch(.*)*', component: NotFound },
    ],

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})