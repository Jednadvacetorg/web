<script setup lang="ts">
import type { CommunitiesCollectionItem, PagesCollectionItem } from '@nuxt/content'

type PageResult =
  | { type: 'page'; page: PagesCollectionItem }
  | { type: 'community'; community: CommunitiesCollectionItem }

const route = useRoute()
const path = route.path

const { data: result } = await useAsyncData('page-' + path, async (): Promise<PageResult | null> => {
  const page = await queryCollection('pages').path(path).first()
  if (page) return { type: 'page', page }

  const community = await queryCollection('communities').path(path).first()
  if (community) return { type: 'community', community }

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
  <ContentRenderer
    v-if="result?.type === 'page'"
    :value="result.page"
  />
  <PageCommunity
    v-else-if="result?.type === 'community'"
    :community="result.community"
  />
</template>
