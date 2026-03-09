import { proxyToWpRoutes } from './server/utils/legacyProxy'


export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/image',
  ],

  routeRules: {
    '/cntrscl': { proxy: { to: 'https://analytics.jednadvacet.org/collect' } },
    ...proxyToWpRoutes,
  },
})
