import { defineStore } from 'pinia'
import api from '../api'

export const useAuthStore = defineStore('auth', {
   
    actions: {
        async getToken () {
            await api.get('/sanctum/csrf-cookie')
        }
    }

})