import { proxyToWpRoutes } from './server/utils/legacyProxy'


export default defineNuxtConfig({
  compatibilityDate: "2026-03-01",

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/image',
'./modules/content-redirects',
  ],

  nitro: {
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        assets: {
          html_handling: 'drop-trailing-slash',
        },
      }
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
