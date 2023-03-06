import urlJoin from 'url-join'

type UrlJoinFunction = {
  (...parts: string[]): string
  (parts: string[]): string
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('urlJoin', urlJoin)
})

declare module '#app' {
  interface NuxtApp {
    $urlJoin: UrlJoinFunction
  }
}
