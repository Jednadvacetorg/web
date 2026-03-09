import { defineContentConfig, defineCollection } from '@nuxt/content'

const exclude = ['README.md']

export default defineContentConfig({
  collections: {
    blogArticles: defineCollection({
      type: 'page',
      source: {
        include: 'blog-articles/**',
        exclude,
      }
    }),
    blogCategories: defineCollection({
      type: 'page',
      source: {
        include: 'blog-categories/**',
        exclude,
      }
    }),
    communities: defineCollection({
      type: 'page',
      source: {
        include: 'communities/**',
        exclude,
        prefix: '/',
      }
    }),
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**',
        exclude,
        prefix: '/',
      }
    }),
    people: defineCollection({
      type: 'page',
      source: {
        include: 'people/**',
        exclude,
      }
    }),
  },
})
