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
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'web',
            database_id: '76d271b2-5335-40ba-81dd-bf7e1ef79522'
          }
        ],
        observability: {
          enabled: true,
          logs: {
            enabled: true,
            invocation_logs: true,
          },
        },
      }
    },
    preset: 'cloudflare_module',
  },

  routeRules: {
    '/cntrsclt': { proxy: { to: 'https://analytics.jednadvacet.org/tracker.js' } }, // Mask tracker URL to avoid blockers.
    '/cntrsclc': { proxy: { to: 'https://analytics.jednadvacet.org/collect' } },
    '/blog/**': { prerender: true },
    '/blog': { prerender: true },
    ...proxyToWpRoutes,
  },

  vite: {
    server: {
      allowedHosts: true,
    },
  },
})
