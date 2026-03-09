

import type { NitroRouteConfig } from 'nitropack/types'
import type { H3Event } from 'h3'


function onResponse (event: H3Event<globalThis.EventHandlerRequest>, response: Response) {
  console.log(response)
}

export const proxyToWpRoutes = [
  '/author',
  '/bitcoin',
  '/bitcoin-pod-vlastni-kontrolou',
  '/bitcoin-uzel-jednadvacet',
  '/bitcoin.pdf',
  '/bolt-karta-a-bitlifi',
  '/bolt-karta-a-lnbits',
  '/category',
  '/comments',
  '/events',
  '/finance',
  '/firefish-aneb-jak-nikdy-neprodat-svuj-bitcoin',
  '/jak-darovat-bitcoin-pomoci-lotes',
  '/jak-pridat-podnik-na-mapu',
  '/jak-vybrat-zpusob-prijimani-bitcoinu-v-obchode',
  '/je-na-case-platit-bitcoinem',
  '/jednadvacet-na-chaincampu',
  '/kalendar',
  '/kalendarium-*',
  '/kategorie-produktu',
  '/kosik',
  '/medojedici',
  '/obchod',
  '/partneri',
  '/pravidla',
  '/studuj-bitcoin',
  '/tag',
  '/ucebnice-bitcoinovy-diplom',
  '/vas-majetek-se-pomalu-vytraci',
  '/wp-*',
  '/zakladni-orientace-v-dedictvi-bitcoinu',
].reduce((a, v) => ({
  ...a,
  [`${v}/**`]: { proxy: { to: `https://old.jednadvacet.org${v}/**`, onResponse } } as NitroRouteConfig
}), {})
