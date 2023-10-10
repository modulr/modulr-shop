import { defineStore } from 'pinia'
import api from '../api'

export const useAutopartsStore = defineStore('autoparts', {

    state: () => ({
        autoparts: [],
        pagination: {
            from: 0,
            to: 0,
            total: 0,
            per_page: 50,
            current_page: 1,
            last_page: 1
        },
        loading: false,
        lists: {
            makes: [],
            models: [],
            categories: [],
        },
        filters: {
            make: null,
            model: null,
            category: null,
            number: null,
            sort: 'latest'
        },
        autopart: {},
        currentImage: null,
    }),
    actions: {
        async getAutoparts(page) {

            this.loading = true
            
            await api.post('/api/autoparts/search?page='+page, this.filters)
            .then((response) => {

                this.autoparts = response.data.data

                this.pagination = {
                    from: response.data.from,
                    to: response.data.to,
                    total: response.data.total,
                    per_page: response.data.per_page,
                    current_page: response.data.current_page,
                    last_page: response.data.last_page
                }
                
                this.loading = false

            }).catch( error => {

                this.loading = false
                console.error( 'Error al consultar en la API: ', error );
            })
        },
        async getAutopart(id) {

            this.loading = true

            await api.get(`/api/autoparts/${id}`)
            .then((response) => {

                this.autopart = response.data
                this.autopart.years = JSON.parse(this.autopart.years)
                this.setCurrentImage(this.autopart.images[0])
                this.loading = false

            }).catch( error => {

                this.loading = false
                console.error( 'Error al consultar en la API: ', error );
            })
        },
        setCurrentImage(img) {
            this.currentImage = img
        },
        async getMakes() {
            await api.get('/api/makes')
            .then((response) => {

                this.lists.makes = response.data

            }).catch( error => {

                console.error( 'Error al consultar en la API: ', error );
            })
        },
        async getModels() {
            await api.get('/api/models')
            .then((response) => {

                this.lists.models = response.data

            }).catch( error => {

                console.error( 'Error al consultar en la API: ', error );
            })
        },
        async getCategories() {
            await api.get('/api/categories')
            .then((response) => {

                this.lists.categories = response.data

            }).catch( error => {

                console.error( 'Error al consultar en la API: ', error );
            })
        }
    }

})