import { appDescription } from './constants/index'

export default defineNuxtConfig({
  vue: {
    defineModel: true,
  },

  typescript: {
    shim: true,
  },

  extends: [
    '@nuxt-themes/typography',
  ],

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/devtools',
    'nuxt-typed-router',
    'unplugin-icons/nuxt',
    '@nuxt/image',
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

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
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

  devtools: {
    enabled: true,
  },

  css: [
    '@/assets/css/main.css',
    '@/assets/css/md.css',
    'nprogress/nprogress.css',
  ],

  image: {
    inject: true,
    provider: 'netlify',
  },

  watch: [
    'tokens.config.ts',
    'app.config.ts',
  ],
})
