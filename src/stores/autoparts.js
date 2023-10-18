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
            filteredCategories: [],
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
            if (this.lists.makes.length == 0) {
                await api.get('/api/makes')
                .then((response) => {

                    this.lists.makes = response.data

                }).catch( error => {

                    console.error( 'Error al consultar en la API: ', error );
                })
            }
        },
        async getModels() {
            if (this.lists.models.length == 0) {
                await api.get('/api/models')
                .then((response) => {

                    this.lists.models = response.data

                }).catch( error => {

                    console.error( 'Error al consultar en la API: ', error );
                })
            }
        },
        async getCategories() {
            if (this.lists.categories.length == 0) {
                await api.get('/api/categories')
                .then((response) => {

                    this.lists.categories = response.data
                    this.lists.filteredCategories = response.data

                }).catch( error => {

                    console.error( 'Error al consultar en la API: ', error );
                })
            }
        },
        searchCategories(search) {
    
            const query = search.toLowerCase();
    
            if (!this.lists.categories || this.lists.categories.length === 0) {
                return []
            }
    
            let cats = this.lists.categories.filter((option) => {
                const nameMatch = option.name.toLowerCase().includes(query)
                const variants = JSON.parse(option.variants || '[]')
                const variantsMatch = variants && variants.some((variant) => variant.toLowerCase().includes(query))
    
                return (nameMatch || variantsMatch)
            });
            if(cats.length < 1){
                cats = cats.concat({
                    id: 0,
                    name: query
                });
            }
            
            this.lists.filteredCategories = cats
        }
    }

})