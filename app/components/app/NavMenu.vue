<script setup lang="ts">
const links = [
  { label: 'Medojedíci', to: '/medojedici/' },
  { label: 'Kalendář', to: '/kalendar/' },
  { label: 'Přispěj nebo získej financování', to: '/finance/' },
  { label: 'Blog', to: '/blog/' },
  { label: 'Obchod', to: '/obchod/' },
  { label: 'Košík', to: '/kosik/' },
  { label: 'Affiliate odkazy', to: '/partneri/' }
]
</script>

<template>
  <UNavigationMenu :items="links" />
</template>
