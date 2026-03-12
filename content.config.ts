import { defineContentConfig, defineCollection } from '@nuxt/content'

const exclude = ['README.md']

export default defineContentConfig({
  collections: {
    blogArticles: defineCollection({
      type: 'page',
      source: {
        include: 'blog-articles/**',
        exclude,
        prefix: '/blog',
      }
    }),
    blogCategories: defineCollection({
      type: 'page',
      source: {
        include: 'blog-categories/**',
        exclude,
        prefix: '/blog',
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
