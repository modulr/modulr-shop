<template>
   <div id="hello">
     <h1>{{ message }}</h1>
     <input type="text" :value="message">
   </div>
 </template>
 
 <script>
 import { computed, defineComponent } from 'vue'
 import { useMainStore } from '../store'
 
 export default defineComponent({
   setup() {
     const main = useMainStore()
 
     return {
       message: computed(() => main.message),
     }
   },
 })
 </script>