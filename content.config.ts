import { defineContentConfig, defineCollection, z, property } from '@nuxt/content'

const exclude = ['README.md']

export default defineContentConfig({
  collections: {
    blogArticles: defineCollection({
      type: 'page',
      source: {
        include: 'blog-articles/**',
        exclude,
        prefix: '/blog',
      },
      schema: z.object({
        published: property(z.string().optional()).editor({ hidden: true }),
        thumbnail: property(z.string().optional()).editor({ hidden: true }),
        authors: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),
        redirect_from: z.array(z.string()).optional(),
      }).passthrough()
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
