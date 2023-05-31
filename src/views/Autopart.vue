<script>
    import api from '../api'

    export default {
        data() {
            return {
                autopartId: this.$route.params.id,
                autopart: {
                    make: {},
                    model: {},
                    years: [],
                    origin: {},
                    status: {},
                    images: [],
                    store: {},
                    storeMl: {},
                },
                currentImage: null,
                loading: false
            }
        },

        // watch: {
        //     autopartId(newValue, old) {
        //         console.log(newValue);
        //         if (newValue) {
        //             this.get(newValue)
        //         }
        //     },
        //     '$route.params.id'(to, from) {
        //         console.log(to);
        //         this.get(to)
        //     }
        // },

        methods: {
            async get(id) {
                this.loading = true
                await api.get(`/api/autoparts/${id}`)
                .then((response) => {

                    this.autopart = response.data
                    this.setCurrentImage(this.autopart.images[0])
                    this.loading = false

                }).catch( error => {

                    this.loading = false
                    console.error( 'Error al consultar en la API: ', error );
                })
            },
            setCurrentImage(img) {
                this.currentImage = img
            }
        },

        mounted() {
            this.get(this.autopartId)
        }
        
    }
    
</script>

<template>
    <section class="py-12 sm:py-16"> 
        <div class="container mx-auto px-4">

            <ol role="list" class="flex items-center">
                <li>
                    <span class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Home </span>
                </li>
                <li v-if="autopart.store.name">
                    <span class="mx-2 text-gray-400">/</span>
                    <span class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> {{ autopart.store.name }} </span>
                </li>
                <li v-if="autopart.id">
                    <span class="mx-2 text-gray-400">/</span>
                    <span class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> {{ autopart.id }} </span>
                </li>
            </ol>

            <div v-if="loading" class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                <div class="lg:col-span-3 lg:row-end-1">
                    <div class="sticky top-0 z-50 overflow-hidden">
                        <div class="relative mb-6 lg:mb-10 lg:h-2/4">
                            <div className="animate-pulse h-72 bg-gray-300 rounded"></div>
                        </div>
                        <div class="flex-wrap hidden md:flex">
                            <div class="w-1/2 p-2 sm:w-1/4">
                                <div href="#" class="block border">
                                    <div className="animate-pulse h-20 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                            <div class="w-1/2 p-2 sm:w-1/4">
                                <div href="#" class="block border">
                                    <div className="animate-pulse h-20 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                            <div class="w-1/2 p-2 sm:w-1/4">
                                <div href="#" class="block border">
                                    <div className="animate-pulse h-20 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                            <div class="w-1/2 p-2 sm:w-1/4">
                                <div href="#" class="block border">
                                    <div className="animate-pulse h-20 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                    <div class="mt-5 flex items-center">
                        <div class="w-full mb-12">
                            <div class="mb-12">
                                <div className="animate-pulse h-6 bg-gray-300 rounded mb-6"></div>
                                <div className="animate-pulse h-6 bg-gray-300 rounded w-2/3"></div>
                            </div>
                            <div class="space-y-2 mb-12">
                                <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                                <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-2/4"></div>
                            </div>
                            <div class="flex space-x-2">
                                <div className="animate-pulse h-10 bg-gray-300 rounded w-1/2"></div>
                                <div className="animate-pulse h-10 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-3">
                    <div class="border-b border-gray-300">
                        <nav class="flex gap-4">
                            <span class="border-b-2 border-gray-900 py-4 font-medium text-gray-900"> Descripción </span>
                        </nav>
                    </div>

                    <div class="mt-8 flow-root sm:mt-12 space-y-2">
                        <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                        <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                        <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                        <div className="animate-pulse h-4 bg-gray-300 rounded w-2/3"></div>
                        <div className="animate-pulse h-4 bg-gray-300 rounded w-1/3"></div>
                    </div>
                </div>
            </div>

            <div v-else class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                <div class="lg:col-span-3 lg:row-end-1">
                    <div>
                        <div class="relative mb-6 lg:mb-10 lg:h-2/4" v-if="currentImage">
                            <img class="object-cover w-full lg:h-full rounded-2xl" :src="currentImage.url" alt="Auto Global">
                        </div>
                        <div class="flex flex-wrap">
                            <div class="w-1/5 p-1 sm:p-2" v-for="image in autopart.images" :key="image.id">
                                <a href="#" class="block border-2 hover:border-red-400 rounded-md" :class="[currentImage.id == image.id ? 'border-red-400': 'border-transparent']" @click.prevent="setCurrentImage(image)">
                                    <img class="object-cover w-full lg:h-20 rounded" :src="image.url_thumbnail" alt="Auto Global">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                    <div class="sm:mt-5 flex items-center">
                        <div class="w-full mb-14">
                            <span class="text-lg font-medium text-red-600" v-if="autopart.origin">{{ autopart.origin.name }}</span>
                            <h1 class="max-w-xl mt-2 mb-6 text-2xl font-bold md:text-4xl">{{ autopart.name }}</h1>
                            <p class="text-green-600 mb-4">10% descuento</p>
                            <h2 class="inline-block mb-8 text-4xl font-bold text-gray-700">
                                <span>${{ autopart.sale_price }}</span>
                                <span class="text-base font-normal text-gray-500 line-through ml-2">${{ autopart.discount_price }}</span>
                            </h2>
                            <div class="mb-8">
                                <h3 class="w-16 pb-1 mb-4 border-b border-red-400 text-gray-600">Marca</h3>
                                <div class="font-bold" v-if="autopart.make">{{ autopart.make.name }}</div>
                            </div>
                            <div class="mb-8">
                                <h3 class="w-16 pb-1 mb-4 border-b border-red-400 text-gray-600">Modelo</h3>
                                <div class="font-bold" v-if="autopart.model">{{ autopart.model.name }}</div>
                            </div>
                            <div class="mb-12">
                                <h3 class="w-16 pb-1 mb-4 border-b border-red-400 text-gray-600">Años</h3>
                                <div class="font-bold" v-if="autopart.years.length > 0">
                                    <span v-for="(year, index) in autopart.years" :key="year.id" >
                                        {{year.name}}<span v-if="index+1 < autopart.years.length">, </span>
                                    </span>
                                </div>
                            </div>
                            <div class="flex flex-wrap items-center gap-4">
                                <a :href="`https://api.whatsapp.com/send?phone=528117409087&text=Me%20interesa%20la%20autoparte%20${autopart.name},%20ID:%20${autopart.id}&source=&data=`" target="_blank" class="flex items-center justify-center w-full p-4 bg-red-600 rounded-full border border-red-600 lg:w-2/5 text-white hover:bg-red-700">
                                    Comprar
                                </a>
                                <a v-if="autopart.ml_url" :href="autopart.ml_url" target="_blank" class="flex items-center justify-center w-full p-4 text-red-600 border border-red-600 rounded-full lg:w-2/5 hover:bg-red-600 hover:border-red-600 hover:text-white">
                                    Mercado Libre
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-3">
                    <div class="border-b border-gray-300">
                        <nav class="flex gap-4">
                            <span class="border-b-2 border-gray-900 py-4 text-gray-600"> Descripción </span>
                        </nav>
                    </div>

                    <div class="mt-8 flow-root sm:mt-12 mb-8 whitespace-pre-line">
                        {{ autopart.description }}
                    </div>

                    <div v-if="autopart.location">Ubicación {{ autopart.location }}</div>
                </div>
            </div>
        </div>
    </section>
</template>