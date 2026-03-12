<script setup lang="ts">
import type { BlogArticles, BlogCategories } from '#content'

defineProps<{
  category?: BlogCategories
}>()

const { data: articles } = await useAsyncData('blog-articles-list', () => {
  return queryCollection('blogArticles').order('path', 'DESC').all() as Promise<BlogArticles[]>
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

    <UBlogPosts v-if="articles?.length">
      <UBlogPost
        v-for="article in articles"
        :key="article.path"
        :title="article.title"
        :description="article.description"
        :date="article.date ? new Date(article.date) : undefined"
        :badge="article.categories?.[0]"
        :to="article.path"
      />
    </UBlogPosts>
    <p v-else class="text-center text-gray-500 py-8">Žádné články</p>
  </div>
</template>
