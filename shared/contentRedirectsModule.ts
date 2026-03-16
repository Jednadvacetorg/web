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
      const redirectFrom = content.meta?.redirect_from
      if (!redirectFrom?.length) return

      const to = content.path

      let existingContent = ''
      if (fs.existsSync(redirectsFile)) {
        existingContent = fs.readFileSync(redirectsFile, 'utf-8')
      }

      for (const from of redirectFrom) {
        const target = `${to}?utm_source=redirect&utm_from=${encodeURIComponent(from)}`
        const line = `${from} ${target} 301`
        if (existingContent.includes(line)) continue
        fs.appendFileSync(redirectsFile, line + '\n')
      }
    })
  }
})
