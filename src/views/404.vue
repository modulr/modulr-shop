<template>
    <div class="bg-[url('/img/not-found.png')] bg-no-repeat bg-center md:bg-contain flex w-full h-screen align-middle">
        <div class="container m-auto text-center">
            <p class="font-title text-7xl md:text-8xl font-bold text-gray-500">404</p>
            <p class="text-2xl md:text-3xl text-gray-500 mb-12">Página no encontrada</p>
            <router-link to="/" class="py-3 px-12 rounded-full text-center text-white transition bg-gradient-to-b from-red-500 to-red-700 hover:to-red-800 outline-red-600">
                Volver al inicio
            </router-link>
        </div>
    </div>
</template>

  