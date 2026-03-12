<script setup lang="ts">
import type { Communities } from '#content'

defineProps<{
  community: Communities
}>()
</script>

<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <header class="mb-8">
      <h1 class="text-4xl font-bold">{{ community.title }}</h1>
    </header>

    <div v-if="community.body" class="mb-8 prose dark:prose-invert">
      <ContentRenderer :value="community" />
    </div>

    <div v-if="community.map" class="mb-6 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
      <p class="text-sm text-gray-500 mb-2">📍 {{ community.title }}</p>
      <div class="text-sm">
        <p>Souřadnice: {{ community.map.lat }}, {{ community.map.lng }}</p>
        <p>Zoom: {{ community.map.zoom }}</p>
      </div>
    </div>

    <div v-if="community.signal_group" class="mb-6">
      <a
        :href="community.signal_group"
        target="_blank"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        <span>Připojit se do Signal skupiny</span>
      </a>
    </div>

    <div v-if="community.organizers?.length" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Organizátoři</h2>
      <ul class="space-y-2">
        <li v-for="organizer in community.organizers" :key="organizer">
          <NuxtLink
            :to="`/people/${organizer}`"
            class="text-primary-500 hover:underline"
          >
            {{ organizer }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
