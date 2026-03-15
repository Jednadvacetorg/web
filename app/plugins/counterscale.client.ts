import * as Counterscale from "@counterscale/tracker";


export default defineNuxtPlugin(() => {
  Counterscale.init({
    siteId: window.location.hostname,
    reporterUrl: '/cntrsclc', // Proxy to https://analytics.jednadvacet.org/collect, so ad-blockers will not block it
  })
})
