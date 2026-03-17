import { defineNuxtModule } from '@nuxt/kit'
import fs from 'node:fs'
import path from 'node:path'


export default defineNuxtModule({
  setup(_, nuxt) {
    const dataDir = path.join(nuxt.options.rootDir, '.data', 'content')
    if (fs.existsSync(dataDir)) {
      fs.rmSync(dataDir, { recursive: true, force: true })
    }

    const redirectsFile = path.join(nuxt.options.rootDir, 'public', '_redirects')
    if (fs.existsSync(redirectsFile)) {
      fs.unlinkSync(redirectsFile)
    }

    nuxt.hook('content:file:afterParse', (ctx) => {
      const content = ctx.content as any
      const redirectFrom = content.redirect_from
      if (!redirectFrom?.length) return

      for (const from of redirectFrom) {
        const utm = `utm_source=redirect&utm_medium=redirect&utm_campaign=legacy_url&utm_content=${encodeURIComponent(from)}`
        const line = `${from} ${content.path}?${utm} 301`
        fs.appendFileSync(redirectsFile, line + '\n')
      }
    })
  }
})
