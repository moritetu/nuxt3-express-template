import Icons from 'unplugin-icons/vite'

const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },

  // Change root directory
  srcDir: 'src/client/',

  app: {
    head: {
      meta: [],
      link: [{ rel: 'shortcut icon', href: '/favicon.ico' }],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  runtimeConfig: {
    public: {},
  },

  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '@/assets/css/main.scss',
  ],

  serverHandlers: [
    // API handlers with express
    // NOTE: If change route, paths in .env, config and lib/url.ts must be changed
    { route: '/server/api/**', handler: './src/server/index.ts' },
  ],

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@intlify/nuxt3',
    'unplugin-icons/nuxt',
    '@nuxtjs/device',
    'nuxt-security',
  ],

  build: {
    transpile: ['primevue'],
  },

  vite: {
    plugins: [
      Icons({
        autoInstall: true,
      }),
    ],
  },

  vue: {
    compilerOptions: {},
  },

  routeRules: {},

  //
  // Module options
  //

  pinia: {
    disableVuex: true,
  },

  // https://nuxt-security.vercel.app/getting-started/configuration
  security: {
    enabled: !isDev,
    // Set disable to cause file upload error.
    xssValidator: false,
    headers: {
      contentSecurityPolicy: {
        value: {
          'img-src': ["'self'", 'data:', 'blob:'],
        },
      },
    },
  },

  tailwindcss: {
    // use tailwind.config.js
  },
})
