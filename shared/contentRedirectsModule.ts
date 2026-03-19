import { defineNuxtModule, extendRouteRules } from '@nuxt/kit'

export default defineNuxtModule({
  setup(_, nuxt) {
    nuxt.hook('content:file:afterParse', (ctx: any) => {
      const content = ctx.content as any
      const redirectFrom = content?.redirect_from
      const path = content?.path
      if (redirectFrom?.length && path) {
        for (const from of redirectFrom) {
          extendRouteRules(from, { redirect: { to: path, statusCode: 301 } })
        }
      }
    })
  }
})
