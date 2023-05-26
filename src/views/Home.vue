<script>
    import api from '../api'
    //import axios from 'axios';

    export default {
        data() {
            return {
                autoparts: []
            }
        },

        methods: {
            async getAll() {
                await api.get('/api/autoparts')
                .then((response) => {

                    this.autoparts = response.data

                }).catch( error => {

                    console.error( 'Error al consultar en la API: ', error );
                })
            }
        },
        
        mounted() {
            this.getAll()
        }
    }
    
</script>

<template>
    <div class="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-[url('/16.jpg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('/16.jpg')]">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center flex-wrap">
                <div class="relative lg:w-7/12 py-24 xl:py-32">
                    <h1 class="font-title font-bold text-3xl text-red-700 md:text-4xl">Encuentra todo lo que necesitas para <span class="text-gray-900">tu auto</span></h1>
                    <form action="" class="w-full mt-12">
                        <div class="relative flex p-1 rounded-full bg-white border border-red-200 shadow-md md:p-2">
                            <select class="hidden p-3 rounded-full bg-transparent md:block md:p-4 outline-0">
                                <option value="design">Marca</option>
                                <option value="development">Restaurant</option>
                                <option value="marketing">Marketing</option>
                            </select>
                            <select class="hidden p-3 rounded-full bg-transparent md:block md:p-4 outline-0">
                                <option value="design">Modelo</option>
                                <option value="development">Restaurant</option>
                                <option value="marketing">Marketing</option>
                            </select>
                            <input placeholder="Pieza" class="w-full p-4 rounded-full outline-0" type="text">
                            <button type="button" title="Start buying" class="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-red-500 to-red-700 hover:to-red-800 md:px-12">
                                <span class="hidden text-white font-semibold md:block">
                                    Buscar
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 mx-auto text-white md:hidden" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="container mx-auto px-4 py-32">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-x-8 sm:gap-y-16">

            <div class="mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl" v-for="autopart in autoparts" :key="autopart.id">
                <img class="w-full h-52 object-cover object-center" :src="autopart.url" :alt="autopart.name" />
                <div class="px-4 py-6">
                    <h2 class="mb-5 font-medium text-gray-600">{{ autopart.name }}</h2>
                    <!-- <p class="mb-5 text-base text-gray-400 truncate ...">{{ autopart.description }}</p> -->
                    <div class="flex items-center">
                        <p class="mr-2 text-xl font-semibold text-gray-900">${{ autopart.sale_price }}</p>
                        <p class="text-base font-medium text-gray-500 line-through">${{ autopart.discount_price }}</p>
                        <p class="ml-auto text-base font-medium text-green-500">10% off</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

</template>