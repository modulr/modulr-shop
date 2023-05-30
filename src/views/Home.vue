<script>
    import api from '../api'

    export default {
        data() {
            return {
                autoparts: [],
                loading: false
            }
        },

        methods: {
            async getAll() {
                this.loading = true
                await api.get('/api/autoparts')
                .then((response) => {

                    this.autoparts = response.data
                    this.loading = false

                }).catch( error => {

                    this.loading = false
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
    <div class="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-[url('/img/bg-hero.jpg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('/img/bg-hero.jpg')]">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap pt-16 pb-32 sm:py-32 lg:py-40">
                <h1 class="font-title font-bold text-3xl text-red-600 md:text-4xl drop-shadow-md w-4/6 md:w-5/12 mb-12">Encuentra todo para <span class="text-gray-900">tu auto</span></h1>
                <form action="" class="w-full lg:w-8/12 flex flex-col sm:flex-row p-4 sm:p-2 space-y-4 sm:space-y-0 bg-white shadow-md rounded-3xl sm:rounded-full border border-gray-200">
                    <select class="p-3 bg-transparent md:p-4 outline-0">
                        <option value="design">Marca</option>
                        <option value="development">Restaurant</option>
                        <option value="marketing">Marketing</option>
                    </select>
                    <select class="p-3 bg-transparent md:p-4 outline-0">
                        <option value="design">Modelo</option>
                        <option value="development">Restaurant</option>
                        <option value="marketing">Marketing</option>
                    </select>
                    <select class="p-3 bg-transparent md:p-4 outline-0">
                        <option value="design">Categoria</option>
                        <option value="development">Restaurant</option>
                        <option value="marketing">Marketing</option>
                    </select>
                    <!-- <input placeholder="Pieza" class="w-full p-4 rounded-full outline-0" type="text"> -->
                    <button type="button" class="w-full md:w-auto ml-auto py-3 px-12 rounded-full text-center transition bg-gradient-to-b from-red-500 to-red-700 hover:to-red-800">
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

    <div class="container mx-auto px-4 mb-32" v-if="loading">
        <div class="flex justify-center">
            <img class="" src="/img/loader.gif" alt="Loading Autoparts">
        </div>
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

    <div class="container mx-auto px-4 pt-20 pb-36" v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-x-8 sm:gap-y-16">
            <router-link :to="`/autopart/${autopart.id}`" class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl" v-for="autopart in autoparts" :key="autopart.id">
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
            <div class="w-full flex items-center justify-between border-b border-gray-200">
                <div class="flex items-center pb-4 text-gray-600 hover:text-red-700 cursor-pointer">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class=" ml-3 font-medium leading-none">Previous</p>                    
                </div>
                <div class="sm:flex hidden">
                    <p class=" font-medium leading-none cursor-pointer text-gray-600 hover:text-red-700 border-b border-transparent hover:border-red-400 pb-4 mr-4 px-2">1</p>
                    <p class=" font-medium leading-none cursor-pointer text-gray-600 hover:text-red-700 border-b border-transparent hover:border-red-400 pb-4 mr-4 px-2">2</p>
                    <p class=" font-medium leading-none cursor-pointer text-gray-600 hover:text-red-700 border-b border-transparent hover:border-red-400 pb-4 mr-4 px-2">3</p>
                    <p class=" font-medium leading-none cursor-pointer text-red-700 border-b border-red-400 pb-4 mr-4 px-2">4</p>
                    <p class=" font-medium leading-none cursor-pointer text-gray-600 hover:text-red-700 border-b border-transparent hover:border-red-400 pb-4 mr-4 px-2">5</p>
                    <p class=" font-medium leading-none cursor-pointer text-gray-600 hover:text-red-700 border-b border-transparent hover:border-red-400 pb-4 mr-4 px-2">6</p>
                    <p class=" font-medium leading-none cursor-pointer text-gray-600 hover:text-red-700 border-b border-transparent hover:border-red-400 pb-4 mr-4 px-2">7</p>
                    <p class=" font-medium leading-none cursor-pointer text-gray-600 hover:text-red-700 border-b border-transparent hover:border-red-400 pb-4 mr-4 px-2">8</p>
                </div>
                <div class="flex items-center pb-4 text-gray-600 hover:text-red-700 cursor-pointer">
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

    <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-end mb-20 space-x-0 sm:space-x-8 space-y-16 md:space-y-0">
            <div class="md:w-6/12">
                <h3 class="font-title text-2xl mb-2">Auto Global</h3>
                <div class="text-gray-700 font-medium text-lg">
                    Nos especializamos en la comercialización y distribución de autopartes, respaldados por una amplia experiencia en el sector.
                </div>
            </div>
            <img class="w-full sm:w-auto md:h-32" src="/img/bg-footer.png" alt="Auto">
        </div>
        <hr class="my-6 lg:my-8 border-gray-200 mx-auto" />
        <span class="block mb-6 lg:mb-8 text-sm text-gray-600 text-center">© 2023 Auto Global. All Rights Reserved.</span>
    </div>
    
</template>