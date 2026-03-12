<script setup lang="ts">
import type { BlogArticlesCollectionItem, BlogCategoriesCollectionItem } from '@nuxt/content'

type BlogResult =
  | { type: 'index' }
  | { type: 'category'; category: BlogCategoriesCollectionItem }
  | { type: 'article'; article: BlogArticlesCollectionItem }

const { path, params: { slug } } = useRoute()

const { data: result } = await useAsyncData(`blog-${slug || 'index'}`, async (): Promise<BlogResult | null> => {
  if (!slug) {
    return { type: 'index' }
  }

  const category = await queryCollection('blogCategories').path(path).first()
  if (category) {
    return { type: 'category', category }
  }

  const article = await queryCollection('blogArticles').path(path).first()
  if (article) {
    return { type: 'article', article }
  }

  return null
})

if (!result.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

definePageMeta({
  layout: 'article'
})
</script>

<template>
  <PageBlogCategory v-if="result?.type === 'index'" />
  <PageBlogCategory v-else-if="result?.type === 'category'" :category="result.category" />
  <PageBlogArticle v-else-if="result?.type === 'article'" :article="result.article" />
</template>
