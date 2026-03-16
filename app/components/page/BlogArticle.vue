<script setup lang="ts">
import type { BlogArticlesCollectionItem } from '@nuxt/content'

defineProps<{
  article: BlogArticlesCollectionItem
}>()
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="article.title"
        :description="article.description"
      />

      <UPageBody>

        <ContentRenderer :value="article" class="prose dark:prose-invert" />

        <USeparator />

        <!-- <NuxtTime v-if="article.published" :datetime="article.published" /> -->
          <span v-if="article.authors" class="authors">
            {{ article.authors.join(', ') }}
          </span>
      </UPageBody>

      <template #right>
        <UContentToc :links="article.body?.toc?.links" />
      </template>

      <template #left>
        <div />
      </template>
    </UPage>
  </UContainer>
</template>
