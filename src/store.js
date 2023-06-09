// renderer/stores/main.js

import { defineStore } from 'pinia'

// useMainStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMainStore = defineStore('main', {
  state: () => ({
    msg: 'Hello World!',
  }),
  getters: {
    message: state => state.msg,
  },
  actions: {},
})