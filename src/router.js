import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Autoparts from './views/Autoparts.vue'
import Components from './views/Components.vue'
import Autopart from './views/Autopart.vue'
import NotFound from './views/404.vue'

const router = createRouter({

    history: createWebHistory(),

    routes: [
        { path: '/', component: Autoparts },
        { path: '/components', component: Components },
        { path: '/autopart/:id/:name?', component: Autopart, props: true },
        { path: '/login', component: Components, beforeEnter(to, from, next) {
            window.location.href = "http://app.autoglobal.mx";
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

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()
    await authStore.getToken()
})

export default router