<template>
  <UApp :locale="cs">
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { cs } from '@nuxt/ui/locale'

const { path } = useRoute()

useHead({
  htmlAttrs: {
    lang: 'cs',
  },
  titleTemplate: '%s | Jednadvacet',
  link: [
    { rel: 'canonical', href: 'https://jednadvacet.org' + path.replace(/\/$/, '') || '/' },
  ],
})
</script>
