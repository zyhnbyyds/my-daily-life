import { appDescription } from './constants/index'

export default defineNuxtConfig({
  vue: {
    defineModel: true,
  },

  typescript: {
    shim: true,
  },

  ssr: false,

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/devtools',
    'nuxt-typed-router',
    'unplugin-icons/nuxt',
    '@nuxt/image',
    ['@pinia/nuxt', {
      autoImport: [
        'defineStore',
        ['defineStore', 'definePiniaStore'],
      ],
    }],
    'nuxt-vitest',
  ],

  content: {
    documentDriven: false,
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'github-dark',
        light: 'vitesse-light',
      },
    },
  },

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
  },

  colorMode: {
    classSuffix: '',
  },

  devServer: {
    port: 3001,
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      routes: ['/', '/artical', '/demo'],
    },
    devProxy: {
      '/music': { target: 'http://localhost:3000', changeOrigin: true },
      '/apiMock': { target: 'https://mock.apifox.cn/m1/2211298-0-default', changeOrigin: true },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  imports: {
    autoImport: true,
    presets: ['vitest'],
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  extends: ['@nuxt-themes/typography'],

  css: [
    '@/assets/css/main.css',
    '@/assets/css/transition.css',
    'nprogress/nprogress.css',
    '@wangeditor/editor/dist/css/style.css',
  ],

  watch: [
    'tokens.config.ts',
    'app.config.ts',
  ],

  test: true,
})
