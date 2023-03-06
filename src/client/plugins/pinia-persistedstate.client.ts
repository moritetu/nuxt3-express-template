import { defineNuxtPlugin } from '#app'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(
    createPersistedState({
      storage: window ? window.sessionStorage : undefined,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      beforeRestore: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      afterRestore: () => {},
      serializer: {
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      },
    }),
  )
})
