<script setup lang="ts">
import type { BlogArticlesCollectionItem } from '@nuxt/content'

defineProps<{
  article: BlogArticlesCollectionItem
}>()
</script>

<template>
  <article class="max-w-3xl mx-auto py-8 px-4">
    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-2">{{ article.title }}</h1>
      <!-- <div class="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
        <time v-if="article.date" :datetime="article.date">
          {{ new Date(article.date).toLocaleDateString('cs-CZ') }}
        </time>
        <span v-if="article.authors" class="authors">
          {{ article.authors.join(', ') }}
        </span>
      </div> -->
    </header>
    <ContentRenderer :value="article" class="prose dark:prose-invert max-w-none" />
  </article>
</template>
