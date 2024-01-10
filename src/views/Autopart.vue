<script setup>
    import { onMounted, ref } from 'vue'
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import { useAutopartsStore } from '../stores/autoparts';
    import { register } from 'swiper/element/bundle';
    register();

    const autopartsStore = useAutopartsStore()
    const numberImages = ref(5);
    const showImage = ref(false)
    const orderImage = ref(0)
    const selectedShipmentIndex = ref(null)

    const props = defineProps({
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        }
    })

    onMounted( async () => {
        await autopartsStore.getAutopart(props.id)

        if (autopartsStore.autopart.images.length <= 5) {
            numberImages.value = autopartsStore.autopart.images.length - 1
        }
    })

    function setCurrentImage(img) {
        autopartsStore.setCurrentImage(img)
    }

    function showCurrentImage(order) {
        showImage.value = true
        orderImage.value = order
    }

    function clearSearch() {
        autopartsStore.autopart.cp = null
        autopartsStore.shipments = {}
        selectedShipmentIndex.value = null
    }

    function setShipmentIndex(shipment,index) {
        console.log(shipment)
        selectedShipmentIndex.value = index
        autopartsStore.autopart.shipment = shipment
    }

</script>

<template>
    <div class="border-b mb-12">
        <div class="container mx-auto px-4">
            <Header class="my-6"></Header>
        </div>
    </div>
    <div class="container mx-auto px-4 pb-52">
        <div v-if="!autopartsStore.loading">
            <div v-if="autopartsStore.autopart">
                <div class="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16 lg:col-gap-12 xl:col-gap-16">
                    <div class="lg:col-span-3 lg:row-end-1">
                        <div class="block sm:hidden">
                            <div class="flex space-x-6">
                                <span class="text-sm font-medium" :class="[autopartsStore.autopart.condition_id == 1 ? 'text-red-600' : 'text-gray-400']">{{ autopartsStore.autopart.condition?.name }}</span>
                                <span class="flex items-center">
                                    <svg v-for="quality in autopartsStore.autopart.quality" :key="quality" class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                                    </svg>
                                </span>
                            </div>
                            <h1 class="font-bold mb-6 mt-2 text-2xl">{{ autopartsStore.autopart.name }}</h1>
                        </div>
                        <div>
                            <div class="mb-6 aspect-w-16 aspect-h-10" @click="showCurrentImage(autopartsStore.currentImage.order)">
                                <img class="object-contain w-full h-full" :src="autopartsStore.currentImage?.url" :alt="autopartsStore.autopart.name">
                            </div>
                            <div>
                                <swiper-container :slides-per-view="numberImages" navigation="true">
                                    <swiper-slide v-for="image in autopartsStore.autopart.images" :key="image.id">
                                        <div class="block border-2 hover:border-red-400 rounded-md" :class="[autopartsStore.currentImage?.id == image.id ? 'border-red-400': 'border-transparent']"
                                            @mouseover.prevent="setCurrentImage(image)" @click.prevent="setCurrentImage(image)">
                                            <img class="object-cover w-full h-20 rounded" loading="lazy" :src="image.url_thumbnail" :alt="autopartsStore.autopart.name">
                                        </div>
                                    </swiper-slide>
                                </swiper-container>  
                            </div>
                        </div>
                    </div>
    
                    <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                        <div class="flex items-center sticky top-10 z-50 overflow-hidden">
                            <div class="w-full mb-14">
                                <div class="hidden sm:block">
                                    <div class="flex space-x-6">
                                        <span class="text-sm font-medium" :class="[autopartsStore.autopart.condition_id == 1 ? 'text-red-600' : 'text-gray-400']">{{ autopartsStore.autopart.condition?.name }}</span>
                                        <span class="flex items-center">
                                            <svg v-for="quality in autopartsStore.autopart.quality" :key="quality" class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <h1 class="font-bold mb-6 mt-2 text-2xl md:text-3xl">{{ autopartsStore.autopart.name }}</h1>
                                </div>
                                <p class="text-green-600 mb-1">10% descuento</p>
                                <h2 class="inline-block mb-8 text-4xl font-bold text-gray-700">
                                    <span>${{ new Intl.NumberFormat().format(autopartsStore.autopart.sale_price) }}</span>
                                    <span class="text-base font-normal text-gray-500 line-through ml-2">${{ new Intl.NumberFormat().format(autopartsStore.autopart.sale_price * 1.10) }}</span>
                                </h2>
                                <div class="mb-6">
                                    <h3 class="font-bold">{{ autopartsStore.autopart.make?.name }}</h3>
                                    <h3 class="w-16 pb-1 mt-2 border-t border-red-400 text-gray-600 text-sm">Marca</h3>
                                </div>
                                <div class="mb-6">
                                    <h3 class="font-bold">{{ autopartsStore.autopart.model?.name }}</h3>
                                    <h3 class="w-16 pb-1 mt-2 border-t border-red-400 text-gray-600 text-sm">Modelo</h3>
                                </div>
                                <div class="mb-6">
                                    <h3 class="font-bold" v-if="autopartsStore.autopart.years?.length > 0">
                                        <span v-for="(year, index) in autopartsStore.autopart.years" :key="year.id">
                                            {{year}}<span v-if="index+1 < autopartsStore.autopart.years.length">, </span>
                                        </span>
                                    </h3>
                                    <h3 class="w-16 pb-1 mt-2 border-t border-red-400 text-gray-600 text-sm">Años</h3>
                                </div>
                                <div class="mb-6 flex-row"> 
                                    <p class="text-gray-600 text-xs">Cotizar Envío</p>
                                    <div class="flex">
                                        <div class="relative w-full">
                                            <input v-model="autopartsStore.autopart.cp" type="text" class="w-full px-4 py-3 rounded-lg font-medium border border-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-40" placeholder="Ingresa Código Postal ...">
                                            <button @click="clearSearch" v-if="autopartsStore.autopart.cp" :disabled="autopartsStore.loading" type="button" class="absolute top-1 right-1 group">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-9 fill-gray-400 stroke-gray-200 hover:fill-gray-500 group-disabled:fill-gray-300 transition-all ease-in-out">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <button type="button" @click="autopartsStore.getQuotation"
                                                class="tracking-wide font-semibold border border-gray-300 disabled:border-gray-100 py-2 px-3 rounded-lg hover:border-gray-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ml-2">
                                            <svg v-if="!autopartsStore.loadingQuotation" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                            </svg>
                                            <p v-if="autopartsStore.loadingQuotation" class="text-gray-600 text-xs">Espere...</p>
                                        </button>
                                    </div>
                                    <p v-if="autopartsStore.shipments.length > 0" class="text-gray-600 text-xs">El precio de envío puede variar al combinar con otras piezas*</p>
                                </div>
                                <div @click="setShipmentIndex(shipment,index)" :class="{ 'border-green-400': selectedShipmentIndex === index }" class="border border-red-400 bg-gray-100 rounded-xl mb-2 cursor-pointer" v-for="(shipment, index) in autopartsStore.shipments" :key="shipment?.id">
                                    <div class="p-6 rounded-xl">
                                        <div class="flex flex-wrap justify-center gap-y-1">
                                            <p class="w-full text-sm font-medium text-gray-600"><span class="font-light">Opción. </span> {{ index + 1 }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="shipment.Dias"><span class="font-light"></span>Llega el día {{ shipment.Dias }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="shipment.Precio"><span class="font-light">Precio.</span> ${{ shipment.Precio }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4 my-12">
                                    <a v-if="autopartsStore.autopart.status_id != 4 && autopartsStore.autopart.status_id != 2 && autopartsStore.autopart.status_id != 3" :href="`https://api.whatsapp.com/send?phone=52${autopartsStore.autopart.store?.phone}&text=Me%20interesa%20la%20autoparte%20${autopartsStore.autopart.name},%20ID:%20${autopartsStore.autopart.id}&source=&data=`" target="_blank" class="flex items-center justify-center w-full md:w-3/6 p-4 rounded-full border border-red-600 bg-red-600 hover:bg-red-700 text-white transition-all ease-in-out">
                                        Comprar
                                    </a>
                                    <div v-else class="flex items-center justify-center w-full md:w-3/6 p-4 rounded-full border border-gray-200 text-gray-400">
                                        No Disponible
                                    </div>
                                    <a v-if="autopartsStore.autopart.ml_id" :href="`https://articulo.mercadolibre.com.mx/${autopartsStore.autopart.ml_id.replace('MLM', 'MLM-')}`" target="_blank" class="flex items-center justify-center w-full md:w-3/6 p-4 text-gray-800 border border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all ease-in-out">
                                        Mercado Libre
                                    </a>
                                </div>

                                <div class="bg-gray-100 p-4 rounded-xl">
                                    <div class="bg-gray-50 p-6 rounded-xl">
                                        <div class="flex flex-wrap justify-center gap-y-4">
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.autopart_number"><span class="font-light">No. parte.</span> {{ autopartsStore.autopart.autopart_number }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.category"><span class="font-light">Categoria.</span> {{ autopartsStore.autopart.category.name }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.origin"><span class="font-light">Origen.</span> {{ autopartsStore.autopart.origin.name }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.position"><span class="font-light">Posición.</span> {{ autopartsStore.autopart.position.name }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.side"><span class="font-light">Lado.</span> {{ autopartsStore.autopart.side.name }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.location"><span class="font-light">Ubicación.</span> {{ autopartsStore.autopart.location.name }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.id"><span class="font-light">ID.</span> {{ autopartsStore.autopart.id }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.ml_id"><span class="font-light"></span> {{ autopartsStore.autopart.ml_id }}</p>
                                            <p class="w-full text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.store"><span class="font-light"></span> {{ autopartsStore.autopart.store?.name }} <span v-if="autopartsStore.autopart.store_ml"> | {{ autopartsStore.autopart.store_ml?.name }}</span></p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
    
                    <div class="lg:col-span-3" v-if="autopartsStore.autopart.description">
                        <div class="border-b border-gray-300">
                            <nav class="flex gap-4">
                                <span class="border-b-2 border-gray-900 py-4 text-gray-600"> Descripción </span>
                            </nav>
                        </div>
    
                        <div class="mt-8 flow-root sm:mt-12 mb-8 whitespace-pre-line">
                            {{ autopartsStore.autopart.description }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="bg-[url('/img/not-found.png')] bg-no-repeat bg-center bg-contain w-full h-full">
                    <div class="container mx-auto px-4 text-center pt-16 pb-40 mb-32">
                        <p class="text-2xl text-gray-500">No encontramos lo que buscas</p>
                        <p class="text-lg text-gray-400 mb-12">Intentalo de nuevo</p>
                        <div class="flex justify-center">
                            <img class="" src="/img/loader-3.gif" alt="Loading Autoparts">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16 lg:col-gap-12 xl:col-gap-16">
                <div class="lg:col-span-3 lg:row-end-1">
                    <div class="sticky top-0 z-50 overflow-hidden">
                        <div class="relative mb-6">
                            <div className="flex justify-center py-28 animate-pulse border rounded">
                                <img class="" src="/img/loader-1.gif" alt="Loading Autoparts">
                            </div>
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
                    <div class="flex items-center">
                        <div class="w-full mb-12">
                            <div class="mb-12">
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                                <div className="animate-pulse h-6 bg-gray-300 rounded mb-1"></div>
                                <div className="animate-pulse h-6 bg-gray-300 rounded mb-12 w-3/4"></div>
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-1/6 mb-2"></div>
                                <div className="animate-pulse h-8 bg-gray-300 rounded w-2/6 mb-12"></div>
                            </div>
                            <div class="space-y-2 my-8">
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-1/4"></div>
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-2/4"></div>
                            </div>
                            <div class="space-y-2 my-8">
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-1/4"></div>
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-2/4"></div>
                            </div>
                            <div class="space-y-2 my-8">
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-1/4"></div>
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-2/4"></div>
                            </div>
                            <div class="flex space-x-2 my-10">
                                <div className="animate-pulse h-14 bg-gray-300 rounded-full w-1/2"></div>
                                <div className="animate-pulse h-14 bg-gray-300 rounded-full w-1/2"></div>
                            </div>
                            <div class="space-y-2">
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-2/4"></div>
                                <div className="animate-pulse h-4 bg-gray-300 rounded w-1/4"></div>
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
        </div>
    </div>

    <div v-if="showImage" class="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center p-2">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click.self="showImage = false"></div>
        <div class="flex max-w-full max-h-full overflow-auto">
            <swiper-container navigation="true" loop="true" :initial-slide="orderImage" :zoom="true">
                <swiper-slide v-for="image in autopartsStore.autopart.images" :key="image.id">
                    <div class="swiper-zoom-container">
                        <img loading="lazy" :src="image.url" :alt="autopartsStore.autopart.name">
                    </div>
                </swiper-slide>
            </swiper-container>  
        </div>
        <button @click="showImage = false" class="z-50 fixed top-4 right-4 outline-none focus:outline-none">
            <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
        </button>
    </div>

    <div class="bg-black">
        <Footer></Footer>
    </div>
</template>