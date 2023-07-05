<script setup>
import Footer from '../components/Footer.vue';
</script>

<template>
    <div>
      <div class="bg-[url('/img/bg-hero.jpg')] bg-no-repeat bg-top bg-cover w-full h-full">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap pt-16 pb-16 sm:py-16 lg:py-32 xl:py-48">
            <div class="mb-8 pl-1">
              <h1 class="font-title font-bold text-4xl text-gray-900 md:text-5xl drop-shadow-md">
                Auto <span class="text-red-600">Global</span>
              </h1>
              <h2 class="text-gray-500 text-lg md:text-2xl tracking-wide md:tracking-wider">
                Las mejores piezas para tu automóvil
              </h2>
            </div>
          </div>
        </div>
      </div>
    
      <div class="bg-[url('/img/not-found.png')] bg-no-repeat bg-center bg-contain w-full h-full">
        <div class="container mx-auto px-4 text-center pt-24 pb-24">
          <h2 class="font-title text-8xl font-bold text-red-600">404</h2>
          <h1 class="text-4xl font-bold text-gray-500">Página no encontrada</h1>
          <div class="flex justify-center mt-8">
            <router-link to="/" class="py-3 px-12 rounded-full text-center transition bg-gradient-to-b from-red-500 to-red-700 hover:to-red-800 outline-red-600">
              <div class="flex justify-center items-center space-x-4">
                <span class="inline text-white font-semibold">Volver al inicio</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  </template>

  