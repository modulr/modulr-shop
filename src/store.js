import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAutopartsStore = defineStore('autoparts', {
  // other options...
    state: () => ({
        autoparts: [],
        pagination: {
            from: 0,
            to: 0,
            total: 0,
            per_page: 50,
            current_page: 1,
            last_page: 1
        },
        lists: {
            makes: [],
            models: [],
            categories: [],
        }
    })
})