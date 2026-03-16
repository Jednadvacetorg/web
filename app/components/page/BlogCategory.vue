<script setup lang="ts">
import type { BlogArticlesCollectionItem, BlogCategoriesCollectionItem } from '@nuxt/content'


defineProps<{
  category?: BlogCategoriesCollectionItem
}>()

// TODO: list only category
const { data: articles } = await useAsyncData('blog-articles-list', () => {
  return queryCollection('blogArticles').order('path', 'DESC').all()
})
</script>

<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <header class="mb-8">
      <h1 v-if="category" class="text-4xl font-bold">{{ category.title }}</h1>
      <h1 v-else class="text-4xl font-bold">Blog</h1>
    </header>

    <div v-if="category?.body" class="mb-8 prose dark:prose-invert">
      <ContentRenderer :value="category" />
    </div>

    <UBlogPosts v-if="articles?.length" orientation="vertical">
      <UBlogPost
        v-for="article in articles"
        :key="article.path"
        :title="article.title"
        :description="article.description"
        :image="article.thumbnail"
        :date="article.published"
        :badge="article.categories?.[0]"
        :to="article.path"
        orientation="horizontal"
        variant="naked"
      />
    </UBlogPosts>
    <p v-else class="text-center text-gray-500 py-8">Žádné články</p>
  </div>
</template>
