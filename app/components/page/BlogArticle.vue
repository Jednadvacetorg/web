<script setup lang="ts">
import type { BlogArticlesCollectionItem } from '@nuxt/content'

defineProps<{
  article: BlogArticlesCollectionItem
}>()

const config = useRuntimeConfig()
</script>

<template>
  <Head>
    <Title>{{ article.title }} | Jednadvacet</Title>
    <Meta name="description" :content="article.description" />
    <Meta property="og:title" :content="article.title" />
    <Meta property="og:description" :content="article.description" />
    <Meta property="og:image" :content="article.thumbnail" />
    <Meta property="og:type" content="article" />
  </Head>

  <UContainer>
    <UPage>
      <UPageHeader
        :title="article.title"
        :description="article.description"
      />

      <UPageBody>

        <ContentRenderer :value="article" class="prose dark:prose-invert" />

        <USeparator v-if="article.authors?.length" class="my-6" />

        <div v-if="article.authors?.length" class="authors space-y-4">
          <AuthorBlock
            v-for="authorId in article.authors"
            :key="authorId"
            :author-id="authorId"
          />
        </div>
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
