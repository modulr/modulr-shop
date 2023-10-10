<script setup>
    import { onMounted, computed, ref } from 'vue'
    import Multiselect from '@vueform/multiselect'
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import { useAutopartsStore } from '../stores/autoparts'; 
    import { register } from 'swiper/element/bundle';
    register();

    const autopartsStore = useAutopartsStore()
    const searchQuery = ref('');
    const makeSelect = ref('');
    const modelSelect = ref('');
    const categorySelect = ref('');
    const numberSelect = ref('');

    onMounted( async () => {
        if (autopartsStore.lists.makes.length == 0)
            await autopartsStore.getMakes()

        if (autopartsStore.lists.models.length == 0)
            await autopartsStore.getModels()

        if (autopartsStore.lists.categories.length == 0)
            await autopartsStore.getCategories()

        if (autopartsStore.autoparts.length == 0)
            await autopartsStore.getAutoparts(1)
    })

    async function search() {
        await autopartsStore.getAutoparts(1)
        window.scroll({top: 500, left: 0, behavior: 'smooth'})
    }

    async function clear() {
        autopartsStore.filters = {
            make: null,
            model: null,
            category: null,
            number: null,
            sort: "latest"
        }
        search()
    }

    function searchCategories(search) {
      searchQuery.value = search;
    }

    function paginate(page) {
        if (page > 0 && page <= autopartsStore.pagination.last_page) {
            window.scroll({top: 500, left: 0, behavior: 'smooth'})
            autopartsStore.getAutoparts(page)
        }
    }

    const filterModels = computed(() => {

        if (autopartsStore.filters.make) {
            var filterArray = autopartsStore.lists.models

            var makeId = autopartsStore.filters.make.id
            filterArray = filterArray.filter(function(item)  {
                return item.make_id == makeId
            })

            return filterArray
        }
    })

    const filteredCategories = computed(() => {
        const query = searchQuery.value.toLowerCase();

        if (!autopartsStore.lists.categories || autopartsStore.lists.categories.length === 0) {
            return [];
        }
      
        let cats = autopartsStore.lists.categories.filter((option) => {
            const nameMatch = option.name.toLowerCase().includes(query);
            const variants = JSON.parse(option.variants || '[]'); // Conversión a matriz
            const variantsMatch = variants && variants.some((variant) => variant.toLowerCase().includes(query));
    
            return (nameMatch || variantsMatch);
        });
        if(cats.length < 1){
            cats = cats.concat({
                id: 0,
                name: query
            });
        }
        return cats;

    });

    const visiblePages = computed(() => {
        const startPage = Math.max(autopartsStore.pagination.current_page - 2, 1);
        const endPage = Math.min(startPage + 4, autopartsStore.pagination.last_page);
        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    })

    function handleMakeInput(){
        autopartsStore.filters.make = null
        autopartsStore.filters.model = null
        search()
        // modelSelect.value.focus();
        // modelSelect.value.open();
    }

    function handleModelInput(){
        autopartsStore.filters.model = null
        search()
        // categorySelect.value.focus();
        // categorySelect.value.open();
    }

    function handleCategoryInput(){
        autopartsStore.filters.category = null
        search()
        //numberSelect.value.focus();
    }

</script>

<template>
    <div class="bg-[url('/img/bg-hero.jpg')] bg-no-repeat bg-top bg-cover w-full h-full">
        <div class="container mx-auto px-4">
            <Header class="mt-6"></Header>
            <div class="flex flex-wrap pt-20 pb-32 lg:pt-32 lg:pb-40 xl:pt-46 xl:pb-60 2xl:pt-52 2xl:pb-72">
                <div class="mb-8 pl-1">
                    <h1 class="font-title font-bold text-4xl text-gray-900 md:text-5xl drop-shadow-md">Auto <span class="text-red-600">Global</span></h1>
                    <h2 class="text-gray-500 text-lg md:text-2xl tracking-wide md:tracking-wider">Las mejores piezas para tu automóvil</h2>
                </div>
                <form @submit.prevent="search" class="w-full lg:w-8/12 flex p-2 space-x-1 bg-white shadow-md rounded-full border border-gray-200">
                    <div class="relative w-full">
                        <input ref="numberSelect" type="text" class="w-full px-4 py-2 sm:py-4 rounded-full outline-0" v-model="autopartsStore.filters.number" placeholder="Puerta Mazda CX5 2023, Número de parte">
                        <button type="button" class="absolute top-1 sm:top-3 right-0 sm:right-1" v-if="autopartsStore.filters.number" @click="clear">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 fill-gray-400 stroke-gray-200 hover:fill-gray-500 transition-all ease-in-out">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <button type="submit" class="px-6 sm:px-12 rounded-full text-center transition bg-gradient-to-b from-red-500 to-red-700 hover:to-red-800 outline-red-600">
                        <div class="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 text-white inline sm:hidden" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <span class="hidden sm:inline text-white font-semibold">
                                Buscar
                            </span>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <div class="mx-auto -mt-10">
        <swiper-container :autoplay="true" slides-per-view="auto" loop="true" autoplay-disable-on-interaction="false">
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/acura.svg" alt="Acura"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/alfa-romeo.svg" alt="Alfa Romeo"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/audi.svg" alt="Audi"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/bmw.svg" alt="BMW"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/cadillac.svg" alt="Cadillac"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/chevrolet.svg" alt="Chevrolet"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/ford.svg" alt="Ford"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/honda.svg" alt="Honda"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/hyundai.svg" alt="Hyundai"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/infiniti.svg" alt="Infiniti"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/jaguar.svg" alt="Jaguar"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/jeep.svg" alt="Jeep"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/kia.svg" alt="Kia"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/land-rover.svg" alt="Land Rover"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/lexus.svg" alt="Lexus"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/lincoln.svg" alt="Lincoln"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/maserati.svg" alt="Maserati"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/mazda.svg" alt="Mazda"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/mercedes-benz.svg" alt="Mercedes Benz"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/mini.svg" alt="Mini"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/mitsubishi.svg" alt="Mitsubishi"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/nissan.svg" alt="Nissan"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/porsche.svg" alt="Porsche"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/tesla.svg" alt="Tesla"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/toyota.svg" alt="Toyota"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/volkswagen.svg" alt="Volkswagen"></swiper-slide>
            <swiper-slide class="w-44"><img class="h-16 w-44 px-6" src="/img/logos/volvo.svg" alt="Volvo"></swiper-slide>
        </swiper-container>
    </div>

    <div class="pb-52 mt-20 bg-gray-50">
        <div class="container mx-auto px-4 mb-12 pt-16">
            <div class="flex flex-col sm:flex-row justify-between gap-4">
                <div class="flex flex-col sm:flex-row gap-4 sm:w-9/12">
                    <Multiselect
                    ref="makeSelect"
                    placeholder="Marca"
                    v-model="autopartsStore.filters.make"
                    :searchable="true"
                    track-by="name"
                    label="name"
                    value-prop="id"
                    :object="true"
                    :options="autopartsStore.lists.makes"
                    @clear="handleMakeInput"
                    @select="search" />
                <Multiselect
                    ref="modelSelect"
                    placeholder="Modelo"
                    v-model="autopartsStore.filters.model"
                    :searchable="true"
                    track-by="name"
                    label="name"
                    value-prop="id"
                    :object="true"
                    :options="filterModels" 
                    @clear="handleModelInput"
                    @select="search"/>
                <Multiselect
                    ref="categorySelect"
                    placeholder="Autoparte"
                    v-model="autopartsStore.filters.category"
                    :searchable="true"
                    :filter-results="false"
                    @search-change="searchCategories"
                    track-by="name"
                    label="name"
                    value-prop="id"
                    :object="true"
                    :options="filteredCategories"
                    @clear="handleCategoryInput"
                    @select="search"/>
                </div>
            
                <select @change="search" v-model="autopartsStore.filters.sort" class="form-select bg-no-repeat appearance-none outline-none pl-4 pr-8 py-2 cursor-pointer border border-gray-300 rounded-lg">
                    <option value="latest" selected>Más Recientes</option>
                    <option value="oldest">Más Antigüas</option>
                    <option value="pricetohigh">Mayor Precio</option>
                    <option value="pricetolow">Menor Precio</option>
                    <option value="atoz">A - Z</option>
                    <option value="ztoa">Z - A</option>
                </select>
            </div>
            <hr class="bg-gray-100 mt-6">
        </div>

        <div v-if="!autopartsStore.loading">
            <div class="container mx-auto px-4" v-if="autopartsStore.autoparts.length > 0">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-x-8 sm:gap-y-16">
                    <router-link :to="`/autopart/${autopart.id}/${autopart.name.replace(/[ \/\.]/g, '-')}`" v-for="autopart in autopartsStore.autoparts" :key="autopart.id" class="w-full mx-auto overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-300/60 duration-300 hover:shadow-xl outline-red-100">
                        <img class="w-full h-52 object-cover object-center" loading="lazy" :src="autopart.url_thumbnail" :alt="autopart.name" />
                        <div class="px-4 py-6">
                            <h2 class="mb-5 font-medium line-clamp-2">{{ autopart.name }}</h2>
                            <div class="flex items-center">
                                <p class="mr-2 text-xl font-semibold">${{ new Intl.NumberFormat().format(autopart.sale_price) }}</p>
                                <p class="text-base font-medium text-gray-500 line-through">${{ new Intl.NumberFormat().format(autopart.sale_price * 1.10) }}</p>
                                <p class="ml-auto text-base font-medium text-green-500">10%</p>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="flex items-center justify-center pt-28 px-4">
                    <div class="w-full flex items-center justify-between border-t border-gray-200">
                        <button @click="paginate(autopartsStore.pagination.current_page - 1)" class="flex items-center pt-4 text-gray-600 hover:text-red-700 cursor-pointer disabled:cursor-default disabled:text-gray-400 disabled:hover:text-gray-400" :disabled="autopartsStore.pagination.current_page == 1 && 'disabled'">
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class=" ml-3 font-medium leading-none">Anterior</p>                    
                        </button>
                        <div class="sm:flex hidden">
                            <p @click="paginate(page)" v-for="page in visiblePages" :key="page" :class="[autopartsStore.pagination.current_page == page ? 'text-red-700 border-red-400' : 'border-transparent']" class="pt-4 mr-4 px-2 font-medium leading-none cursor-pointer text-gray-600 border-t hover:text-red-700 hover:border-red-400">{{ page }}</p>
                        </div>
                        <button @click="paginate(autopartsStore.pagination.current_page + 1)" class="flex items-center pt-4 text-gray-600 hover:text-red-700 cursor-pointer disabled:cursor-default disabled:text-gray-400 disabled:hover:text-gray-400" :disabled="autopartsStore.pagination.current_page == autopartsStore.pagination.last_page && 'disabled'">
                            <p class=" font-medium leading-none mr-3">Siguiente</p>
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>    
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="sm:bg-[url('/img/not-found.png')] bg-no-repeat bg-center bg-contain w-full h-full">
                    <div class="container mx-auto px-4 text-center pt-40">
                        <p class="text-2xl text-gray-500">No encontramos lo que buscas</p>
                        <p class="text-lg text-gray-400">Intentalo de nuevo</p>
                        <div class="flex gap-2 justify-center mt-8">
                            <button type="button" @click="clear"
                                class="tracking-wide gap-2 text-gray-500 font-semibold border border-gray-300 disabled:border-gray-100 py-2 px-4 rounded-lg hover:border-gray-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                Limpiar filtros
                            </button>
                        </div>
                        <div class="flex justify-center">
                            <img class="" src="/img/loader-2.gif" alt="Loading Autoparts">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4" v-else>
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
    </div>

    <div class="bg-black">
        <Footer ></Footer>
    </div>

</template>