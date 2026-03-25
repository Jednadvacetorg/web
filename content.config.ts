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
        seo: property(z.any().optional()).editor({ hidden: true }),
        navigation: property(z.any().optional()).editor({ hidden: true }),
        thumbnail: z.string(),
        title: z.string(),
        categories: z.array(z.string()).optional(),
        authors: z.array(z.string()).optional(),
        redirect_from: z.array(z.string()).optional(),
      }).passthrough()
    }),

    blogCategories: defineCollection({
      type: 'page',
      source: {
        include: 'blog-categories/**',
        exclude,
        prefix: '/blog',
      },
      schema: z.object({
        seo: property(z.any().optional()).editor({ hidden: true }),
        navigation: property(z.any().optional()).editor({ hidden: true }),
      }),
    }),

    communities: defineCollection({
      type: 'page',
      source: {
        include: 'communities/**',
        exclude,
        prefix: '/',
      },
      schema: z.object({
        seo: property(z.any().optional()).editor({ hidden: true }),
        navigation: property(z.any().optional()).editor({ hidden: true }),
      }),
    }),

    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**',
        exclude,
        prefix: '/',
      },
      schema: z.object({
        seo: property(z.any().optional()).editor({ hidden: true }),
        navigation: property(z.any().optional()).editor({ hidden: true }),
      }),
    }),

    people: defineCollection({
      type: 'page',
      source: {
        include: 'people/**',
        exclude,
      },
      schema: z.object({
        seo: property(z.any().optional()).editor({ hidden: true }),
        navigation: property(z.any().optional()).editor({ hidden: true }),
        avatar: z.string().optional(),
        donateLnAddress: z.string().optional(),
        links: z.array(z.string()).optional(),
      }),
    }),
  },
})
