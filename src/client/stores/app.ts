import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    data: null as string | null | undefined,
  }),

  getters: {},

  actions: {},
})
