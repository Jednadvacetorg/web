import { proxyToWpRoutes } from './shared/legacyProxy'


export default defineNuxtConfig({
  compatibilityDate: "2026-03-01",

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/image',
    './shared/contentRedirectsModule',
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
        '/cntrsclc': { proxy: { to: 'https://analytics.jednadvacet.org/collect' } }, // Mask tracker collect URL to avoid blockers.
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
