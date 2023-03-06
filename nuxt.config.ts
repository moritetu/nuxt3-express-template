import Icons from 'unplugin-icons/vite'

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
    // 'primevue/resources/themes/bootstrap4-light-blue/theme.css',
    'primevue/resources/themes/saga-blue/theme.css',
    // 'primevue/resources/themes/fluent-light/theme.css',
    // 'primevue/resources/themes/mdc-light-indigo/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    'easymde/dist/easymde.min.css',
    '@/assets/css/main.scss',
  ],

  serverHandlers: [
    // API handlers with express
    // NOTE: If change route, paths in .env, config and lib/url.ts must be changed
    { route: '/server/api/**', handler: './src/server/index.ts' },
  ],

  // See https://github.com/nuxt-modules/tailwindcss/issues/480
  // Workaround because tailwindcss does not report an error.
  watch: [],

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@intlify/nuxt3',
    'unplugin-icons/nuxt',
    '@nuxtjs/device',
    'nuxt-security',
    '@nuxtjs/google-fonts',
  ],

  build: {
    transpile: ['primevue'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/css/_variables.scss";
            @use "primeflex/primeflex";
`,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },

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

  googleFonts: {
    download: true,
    families: {
      Inter: true,
      'Zen Kaku Gothic New': true,
    },
  },

  intlify: {},

  pinia: {
    disableVuex: true,
  },

  // https://nuxt-security.vercel.app/getting-started/configuration
  security: {},

  tailwindcss: {
    // use tailwind.config.js
  },

  vueuse: {
    // Disable auto-import by vueuse not to application composables duplicate.
    autoImports: false,
  },
})
