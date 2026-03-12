import { proxyToWpRoutes } from './server/utils/legacyProxy'


export default defineNuxtConfig({
  compatibilityDate: "2026-03-01",

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/image',
  ],

  nitro: {
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },
    preset: 'cloudflare_module',
  },

  routeRules: {
    '/cntrscl': { proxy: { to: 'https://analytics.jednadvacet.org/collect' } },
    '/blog/**': { prerender: true },
    '/blog': { prerender: true },
    ...proxyToWpRoutes,
  },
})
