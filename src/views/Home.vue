<script>
    import api from '../api'
    import Multiselect from '@vueform/multiselect'
    import { useMainStore } from '../store'

    export default {
        components: {
            Multiselect,
        },

        data() {
            return {
                main: useMainStore(),
                autoparts: {},
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
                },
                pagination: {
                    from: 0,
                    to: 0,
                    total: 0,
                    per_page: 50,
                    current_page: 1,
                    last_page: 1
                }
            }
        },

        methods: {
            getAll(page) {
                this.loading = true
                api.post('/api/autoparts/search?page='+page, this.filters)
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
            search() {
                this.getAll(1)
            },
            paginate(page) {
                if (page > 0 && page <= this.pagination.last_page) {
                    window.scroll({top: 0, left: 0, behavior: 'smooth'})
                    this.getAll(page)
                }
            },
            getMakes() {
                api.get('/api/makes')
                .then((response) => {

                    this.lists.makes = response.data

                }).catch( error => {

                    console.error( 'Error al consultar en la API: ', error );
                })
            },
            getModels() {
                api.get('/api/models')
                .then((response) => {

                    this.lists.models = response.data

                }).catch( error => {

                    console.error( 'Error al consultar en la API: ', error );
                })
            },
            getCategories() {
                api.get('/api/categories')
                .then((response) => {

                    this.lists.categories = response.data

                }).catch( error => {

                    console.error( 'Error al consultar en la API: ', error );
                })
            }
        },
        
        mounted() {
            this.getMakes()
            this.getModels()
            this.getCategories()
            this.getAll(1)
        },

        computed: {
            filterModels () {
                this.filters.model = null

                if (this.filters.make) {
                    var filterArray = this.lists.models
    
                    var makeId = this.filters.make.id
                    filterArray = filterArray.filter(function(item)  {
                        return item.make_id == makeId
                    })
    
                    return filterArray
                }
            },
            visiblePages() {
                const startPage = Math.max(this.pagination.current_page - 2, 1);
                const endPage = Math.min(startPage + 4, this.pagination.total);
                return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
            },
        }
    }
    
</script>

<template>
    {{ this.main.message }}
    <div class="bg-[url('/img/bg-hero.jpg')] bg-no-repeat bg-top bg-cover w-full h-full">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap pt-16 pb-32 sm:py-32 lg:py-40">
                <h1 class="font-title font-bold text-3xl text-red-600 md:text-4xl drop-shadow-md w-4/6 md:w-5/12 mb-12">Encuentra todo para <span class="text-gray-900">tu auto</span></h1>
                <form @submit.prevent="search" class="w-full lg:w-8/12 flex flex-col sm:flex-row p-4 sm:p-2 space-y-4 sm:space-y-0 space-x-1 bg-white shadow-md rounded-3xl sm:rounded-full border border-gray-200">
                    <Multiselect
                        placeholder="Marca"
                        v-model="filters.make"
                        :searchable="true"
                        track-by="name"
                        label="name"
                        value-prop="id"
                        :object="true"
                        :options="lists.makes" />
                    <Multiselect
                        placeholder="Modelo"
                        v-model="filters.model"
                        :searchable="true"
                        track-by="name"
                        label="name"
                        value-prop="id"
                        :object="true"
                        :options="filterModels" />
                    <Multiselect
                        placeholder="Categoria"
                        v-model="filters.category"
                        :searchable="true"
                        track-by="name"
                        label="name"
                        value-prop="id"
                        :object="true"
                        :options="lists.categories" />
                    <!-- <input placeholder="Pieza" class="w-full p-4 rounded-full outline-0" type="text"> -->
                    <button type="submit" class="w-full md:w-auto ml-auto py-3 px-12 rounded-full text-center transition bg-gradient-to-b from-red-500 to-red-700 hover:to-red-800 outline-none">
                        <div class="flex justify-center items-center space-x-4">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-5 text-white" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg> -->
                            <span class="inline text-white font-semibold">
                                Buscar
                            </span>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <div class="mx-auto -mt-8">
        <div class="flex flex-nowrap space-x-4 sm:justify-between overflow-x-scroll scrollbar-hide">
            <img src="/img/logos/toyota.png" alt="">
            <img src="/img/logos/volvo.png" alt="">
            <img src="/img/logos/ford.png" alt="">
            <img src="/img/logos/lamborghini.png" alt="">
            <img src="/img/logos/audi.png" alt="">
            <img src="/img/logos/mini.png" alt="">
            <img src="/img/logos/vw.png" alt="">
            <img src="/img/logos/land-rover.png" alt="">
            <img src="/img/logos/mazda.png" alt="">
            <img src="/img/logos/nissan.png" alt="">
        </div>
    </div>

    <div class="container mx-auto px-4 pt-20 mb-72" v-if="loading">
        <!-- <div class="flex justify-center">
            <img class="" src="/img/loader-1.gif" alt="Loading Autoparts">
        </div> -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-y-16">
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-4">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-4">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-4">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-4">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-4">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-4">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-4">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className="h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-4">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    </div>

    <div v-else>
        <div class="container mx-auto px-4 pt-20 pb-36" v-if="autoparts.length > 0">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-x-8 sm:gap-y-16">
                <router-link :to="`/autopart/${autopart.id}/${autopart.name.replace(/[ \/]/g, '-')}`" v-for="autopart in autoparts" :key="autopart.id" class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                    <img class="w-full h-52 object-cover object-center" :src="autopart.url" :alt="autopart.name" />
                    <div class="px-4 py-6">
                        <h2 class="mb-5 font-medium">{{ autopart.name }}</h2>
                        <!-- <p class="mb-5 text-base text-gray-400 truncate ...">{{ autopart.description }}</p> -->
                        <div class="flex items-center">
                            <p class="mr-2 text-xl font-semibold">${{ autopart.sale_price }}</p>
                            <p class="text-base font-medium text-gray-500 line-through">${{ autopart.discount_price }}</p>
                            <p class="ml-auto text-base font-medium text-green-500">10%</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="flex items-center justify-center pt-28 px-4">
                <div class="w-full flex items-center justify-between border-t border-gray-200">
                    <div @click="paginate(pagination.current_page - 1)" class="flex items-center pt-4 text-gray-600 hover:text-red-700 cursor-pointer">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p class=" ml-3 font-medium leading-none">Previous</p>                    
                    </div>
                    <div class="sm:flex hidden">
                        <p @click="paginate(page)" v-for="page in visiblePages" :key="page" :class="[pagination.current_page == page ? 'text-red-700 border-red-400' : 'border-transparent']" class="pt-4 mr-4 px-2 font-medium leading-none cursor-pointer text-gray-600 border-t hover:text-red-700 hover:border-red-400">{{ page }}</p>
                    </div>
                    <div @click="paginate(pagination.current_page + 1)" class="flex items-center pt-4 text-gray-600 hover:text-red-700 cursor-pointer">
                        <p class=" font-medium leading-none mr-3">Next</p>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>    
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="bg-[url('/img/not-found.png')] bg-no-repeat bg-center bg-contain w-full h-full">
                <div class="container mx-auto px-4 text-center pt-40 pb-40 mb-32">
                    <p class="text-2xl text-gray-500">No encontramos lo que buscas</p>
                    <p class="text-lg text-gray-400">Intentalo de nuevo</p>
                    <div class="flex justify-center">
                        <img class="" src="/img/loader-4.gif" alt="Loading Autoparts">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>