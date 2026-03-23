<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { data: blogCategories } = await useDataBlogCategories()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Města',
    children: [
      { label: 'Brno' },
      { label: 'Praha' },
      { label: 'TODO' },
    ],
  },
  {
    label: 'Kalendář',
    to: '/kalendar',
  },
  {
    label: 'Podpořit a partneři',
    to: '/podporit',
    children: [
      { label: 'TODO loga s afil linky' },
      { label: 'Další partneři', to: '/podporit#partneri' },
      { label: 'Přispět', to: '/podporit#prispet' },
    ],
  },
  {
    label: 'Blog',
    to: '/blog',
    children: [
      { label: 'Nejnovější články', to: '/blog' },
      ...(blogCategories.value?.map(category => ({
        label: category.title,
        to: category.path
      })) || [])
    ]
  },
  {
    label: 'O Jednadvacet',
    children: [
      { label: 'Lidé', to: '/lide' },
      { label: 'Medojedíci', to: '/medojedici' },
      { label: 'Získej financování', to: '/finance' },
    ],
  },
])
</script>

<template>
  <UNavigationMenu :items="items" />
</template>
