

import type { NitroRouteConfig } from 'nitropack/types'


export const proxyToWpRoutes = [
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
].reduce((a, v) => ({
  ...a,
  [v]: { proxy: { to: `https://old.jednadvacet.org${v}/**` } } as NitroRouteConfig
}), {})
