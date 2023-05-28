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
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center flex-wrap">
                <div class="relative lg:w-7/12 py-32 lg:py-40">
                    <h1 class="font-title font-bold text-3xl text-red-600 md:text-4xl drop-shadow-md w-5/6">Encuentra todo para <span class="text-gray-900">tu auto</span></h1>
                    <form action="" class="w-full mt-12">
                        <div class="relative flex p-1 rounded-full bg-white border border-red-200 shadow-md md:p-2">
                            <select class=" p-3 rounded-full bg-transparent md:block md:p-4 outline-0">
                                <option value="design">Marca</option>
                                <option value="development">Restaurant</option>
                                <option value="marketing">Marketing</option>
                            </select>
                            <select class=" p-3 rounded-full bg-transparent md:block md:p-4 outline-0">
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
    <div class="mx-auto -mt-8">
        <div class="flex flex-nowrap justify-center overflow-hidden space-x-4 pl-6">
            <img src="img/logos/toyota.png" alt="">
            <img src="img/logos/volvo.png" alt="">
            <img src="img/logos/ford.png" alt="">
            <img src="img/logos/lamborghini.png" alt="">
            <img src="img/logos/audi.png" alt="">
            <img src="img/logos/mini.png" alt="">
            <img src="img/logos/vw.png" alt="">
            <img src="img/logos/land-rover.png" alt="">
            <img src="img/logos/mazda.png" alt="">
            <img src="img/logos/nissan.png" alt="">
        </div>
    </div>
    <div class="container mx-auto px-4 mb-32" v-if="loading">
        <div class="flex justify-center">
            <img class="" src="/img/loader.gif" alt="Loading Autoparts">
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-x-8 sm:gap-y-16">
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className=" h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-2">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className=" h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-2">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className=" h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-2">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className=" h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-2">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className=" h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-2">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className=" h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-2">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className=" h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-2">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl">
                <div class="animate-pulse">
                    <div className=" h-48 bg-gray-300 rounded"></div>
                </div>
                <div class="px-4 py-6 space-y-2">
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mx-auto px-4 pt-20 pb-36" v-else>
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

    <div class="">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row mb-20 space-x-8">
                <div class="md:w-6/12">
                    <h3 class="font-title text-2xl mb-2">Auto Global</h3>
                    <div class="text-gray-500 font-semibold">
                        Nos especializamos en la comercialización de autopartes, respaldados por una amplia experiencia en el sector. Gracias a nuestro conocimiento y trayectoria, nos enorgullece ofrecer un servicio de alta calidad.
                    </div>
                </div>
                <img class="h-32" src="img/bg-footer.png" alt="Auto">
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <span class="block mb-6 lg:mb-8 text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Auto Global. All Rights Reserved.</span>
        </div>
    </div>
    
</template>