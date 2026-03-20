import { defineTransformer } from '@nuxt/content'

const idPattern = /^blogArticles\/blog\/(\d{4})(\d{2})(\d{2})\./


export default defineTransformer({
  name: 'blog-articles',
  extensions: ['.md'],
  transform(file: any) {
    // Extract date from filename
    const match = idPattern.exec(file.id)
    if (match) {
      file.published = `${match[1]}-${match[2]}-${match[3]}`
    }
    else {
      return file
    }

    // Find thumbnail image
    const findImage = (children: any[][]): string | null => {
      for (const node of children) {
        if (!Array.isArray(node)) return null
        if (node[0] === 'img' && node[1].src) {
          return node[1].src
        }
        const found = findImage(node.splice(2))
        if (found) return found
      }
      return null
    }

    const paragraphs = (file.body as any)?.value as any[][]
    if (paragraphs) {
      const thumbnail = findImage(paragraphs)
      if (thumbnail) {
        file.thumbnail = thumbnail
      }
    }

    return file
  }
})
