import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Store from './views/Store.vue'
import Autopart from './views/Autopart.vue'

export default createRouter({

    history: createWebHistory(),

    routes: [
        { path: '/', component: Home },
        { path: '/store', component: Store },
        { path: '/autopart/:id', component: Autopart }
    ]

})