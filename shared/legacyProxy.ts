

import type { NitroRouteConfig } from 'nitropack/types'

export const wpPaths = [
  '/',
  '/author',
  '/bitcoin',
  '/bitcoin.pdf',
  '/category',
  '/comments',
  '/events',
  '/finance',
  '/kalendar',
  '/kategorie-produktu',
  '/kosik',
  '/medojedici',
  '/obchod',
  '/partneri',
  '/pravidla',
  '/tag',
  '/wp-*',
  '/feed/',
  '/events/?ical=1',
]

export const proxyToWpRoutes = wpPaths.reduce((a, v) => ({
  ...a,
  [v]: { proxy: { to: `https://old.jednadvacet.org${v}` } } as NitroRouteConfig
}), {})
