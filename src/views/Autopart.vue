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
        console.log(orderImage.value);
    }

</script>

<template>
    <div class="container mx-auto px-4">
        <Header class="mt-6 mb-12"></Header>

        <div v-if="!autopartsStore.loading">
            <div v-if="autopartsStore.autopart">
                <!-- <ol role="list" class="flex items-center">
                    <li>
                        <router-link to="/">
                            <span class="rounded-md p-1 text-sm font-medium font-title">Auto <span class="text-red-600">Global</span></span>
                        </router-link>
                    </li>
                    <li>
                        <span class="mx-2 text-gray-400">/</span>
                        <span class="rounded-md p-1 text-sm font-medium text-gray-600"> {{ autopartsStore.autopart.store?.name }} </span>
                    </li>
                    <li>
                        <span class="mx-2 text-gray-400">/</span>
                        <span class="rounded-md p-1 text-sm font-medium text-gray-600"> {{ autopartsStore.autopart.id }} </span>
                    </li>
                </ol> -->
                <div class="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16 lg:col-gap-12 xl:col-gap-16">
                    <div class="lg:col-span-3 lg:row-end-1">
                        <!-- <div class="lg:flex lg:items-start">
                            <div class="lg:order-2 w-full">
                                <div class="aspect-w-16 aspect-h-12 rounded-lg">
                                    <img class="h-full w-full object-contain" :src="autopartsStore.currentImage?.url" alt="Auto Global">
                                </div>
                            </div>
                            <div class="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                <div class="flex flex-row items-start lg:flex-col space-x-2 space-y-2">
                                    <div class="w-full h-20 rounded-lg text-center"
                                        v-for="image in autopartsStore.autopart.images" :key="image.id">
                                        <div :class="[autopartsStore.currentImage?.id == image.id ? 'border-red-400': 'border-transparent']"
                                        @mouseover.prevent="setCurrentImage(image)" class="block border-2 hover:border-red-400 rounded-md">
                                            <img class="object-cover w-full h-20 rounded" :src="image.url_thumbnail" alt="Auto Global">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div>
                            <div class="mb-6 aspect-w-16 aspect-h-10" @click="showCurrentImage(autopartsStore.currentImage.order)">
                                <img class="object-contain w-full h-full" :src="autopartsStore.currentImage?.url" :alt="autopartsStore.autopart.name">
                            </div>
                            <div class="flex flex-wrap"></div>
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
                                <span class="text-sm font-medium" :class="[autopartsStore.autopart.origin_id == 1 ? 'text-red-600' : 'text-gray-400']">{{ autopartsStore.autopart.origin?.name }}</span>
                                <h1 class="font-bold mb-6 mt-2 text-2xl md:text-3xl">{{ autopartsStore.autopart.name }}</h1>
                                <p class="text-green-600 mb-1">10% descuento</p>
                                <h2 class="inline-block mb-8 text-4xl font-bold text-gray-700">
                                    <span>${{ autopartsStore.autopart.sale_price }}</span>
                                    <span class="text-base font-normal text-gray-500 line-through ml-2">${{ autopartsStore.autopart.discount_price }}</span>
                                </h2>
                                <div class="mb-6">
                                    <h3 class="font-bold">{{ autopartsStore.autopart.make?.name }}</h3>
                                    <h3 class="w-16 pb-1 mt-2 border-t border-red-400 text-gray-600 text-sm">Marca</h3>
                                </div>
                                <div class="mb-6">
                                    <h3 class="font-bold">{{ autopartsStore.autopart.model?.name }}</h3>
                                    <h3 class="w-16 pb-1 mt-2 border-t border-red-400 text-gray-600 text-sm">Modelo</h3>
                                </div>
                                <div>
                                    <h3 class="font-bold" v-if="autopartsStore.autopart.years?.length > 0">
                                        <span v-for="(year, index) in autopartsStore.autopart.years" :key="year.id" >
                                            {{year}}<span v-if="index+1 < autopartsStore.autopart.years.length">, </span>
                                        </span>
                                    </h3>
                                    <h3 class="w-16 pb-1 mt-2 border-t border-red-400 text-gray-600 text-sm">Años</h3>
                                </div>
                                <div class="flex flex-wrap items-center gap-4 my-12" v-if="autopartsStore.autopart.status_id != 4">
                                    <a :href="`https://api.whatsapp.com/send?phone=528117409087&text=Me%20interesa%20la%20autoparte%20${autopartsStore.autopart.name},%20ID:%20${autopartsStore.autopart.id}&source=&data=`" target="_blank" class="flex items-center justify-center w-full p-4 bg-red-600 rounded-full border border-red-600 lg:w-2/5 text-white hover:bg-red-700">
                                        Comprar
                                    </a>
                                    <a v-if="autopartsStore.autopart.ml_url" :href="autopartsStore.autopart.ml_url" target="_blank"
                                    class="flex items-center justify-center w-full p-4 text-red-600 border border-red-600 rounded-full lg:w-2/5 hover:bg-red-600 hover:border-red-600 hover:text-white">
                                        Mercado Libre
                                    </a>
                                </div>
                                <div class="flex flex-wrap items-center my-12" v-else>
                                    <div class="flex items-center justify-center w-full p-4 rounded-full bg-red-100 border border-red-200 text-red-400">
                                        No Disponible
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <p class="text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.store"><span class="font-light">Vendedor.</span> {{ autopartsStore.autopart.store?.name }} <span v-if="autopartsStore.autopart.store_ml"> | {{ autopartsStore.autopart.store_ml?.name }}</span></p>
                                    <h1 class="text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.autopart_number"><span class="font-light">No. parte.</span> {{ autopartsStore.autopart.autopart_number }}</h1>
                                    <p class="text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.id"><span class="font-light">ID.</span> {{ autopartsStore.autopart.id }}</p>
                                    <p class="text-sm font-medium text-gray-600" v-if="autopartsStore.autopart.location"><span class="font-light">Ubicación.</span> {{ autopartsStore.autopart.location }}</p>
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
            <!-- <img class="object-contain w-full h-full" :src="showImage?.url" :alt="showImage?.name"> -->
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

    <Footer></Footer>
</template>