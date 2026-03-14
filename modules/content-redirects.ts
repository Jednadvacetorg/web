import { defineNuxtModule, extendRouteRules } from '@nuxt/kit'


interface ContentWithRedirect {
  meta: {
    redirect_from?: string[]
  }
  path: string
  [key: string]: unknown
}

/**
 * This module adds support for the `redirect_from` frontmatter field in content files.
 */
export default defineNuxtModule({
  hooks: {
    'content:file:afterParse'(ctx) {
      const content = ctx.content as unknown as ContentWithRedirect
      const redirectFrom = content.meta.redirect_from
      if (!redirectFrom?.length) return

      const to = content.path

      for (const from of redirectFrom) {
        extendRouteRules(from, {
          redirect: { to, statusCode: 301 }
        })
      }
    }
  }
})
