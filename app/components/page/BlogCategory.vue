<script setup lang="ts">
import type { BlogCategoriesCollectionItem } from '@nuxt/content'

const props = defineProps<{
  category?: BlogCategoriesCollectionItem
}>()

const config = useRuntimeConfig()

const categoryStem = computed(() => {
  return props.category?.path?.split('/').pop()
})

const { data: blogCategories } = await useDataBlogCategories()

const { data: articles } = await useAsyncData('blog-articles-list', async () => {
  let query = queryCollection('blogArticles').order('id', 'DESC')

  if (categoryStem.value) {
    query = query.where('categories', 'LIKE', `%${categoryStem.value}%`)
  }

  return query.all()
})

const categoryTitle = computed(() => {
  return props.category?.title || 'Blog'
})

const categoryDescription = computed(() => {
  if (!articles.value?.length) return undefined
  return articles.value.map(a => a.title).join(', ')
})
</script>

<template>
  <Head>
    <Title>{{ categoryTitle }}</Title>
    <Meta name="description" :content="categoryDescription" />
    <Meta property="og:title" :content="categoryTitle" />
    <Meta property="og:description" :content="categoryDescription" />
    <Meta property="og:type" content="website" />
  </Head>

  <div class="max-w-3xl mx-auto py-8 px-4">
    <header class="mb-8">
      <h1 class="text-4xl font-bold">{{ categoryTitle }}</h1>

      <div v-if="!category && blogCategories?.length" class="mt-4 flex flex-wrap gap-2">
        <UButton
          v-for="cat in blogCategories"
          :key="cat.path"
          :to="cat.path"
          variant="subtle"
          color="neutral"
          size="md"
        >
          {{ cat.title }}
        </UButton>
      </div>
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
        :image="article.thumbnail || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAD0lEQVR4AQEEAPv/AMzMzATMAmVMDHrmAAAAAElFTkSuQmCC'"
        :date="article.published"
        :badge="article.categories?.[0]"
        :to="article.path"
        orientation="horizontal"
        variant="naked"
        :ui="{ root: 'overflow-visible', header: 'border border-gray-600/10' }"
      />
    </UBlogPosts>
    <p v-else class="text-center text-gray-500 py-8">Žádné články</p>
  </div>
</template>
