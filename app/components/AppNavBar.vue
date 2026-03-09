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

const socialLinks = [
  { icon: 'i-simple-icons-x', to: 'https://x.com/jednadvacetorg', target: '_blank' },
  { icon: 'i-simple-icons-facebook', to: 'https://www.facebook.com/profile.php?id=61573496275870', target: '_blank' },
  { icon: 'i-simple-icons-instagram', to: 'https://www.instagram.com/jednadvacetorg', target: '_blank' },
  { icon: 'i-simple-icons-whatsapp', to: 'https://chat.whatsapp.com/B8fQowgJLf2Bo1DCXOId0n', target: '_blank' }
]
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="https://jednadvacet.org/wp-content/uploads/2023/08/logo-1-negative-space.png" alt="Jednadvacet" class="h-8 dark:hidden">
        <img src="https://jednadvacet.org/wp-content/uploads/2023/08/Jednadvacet-dva-radky-cerna-nbg.png" alt="Jednadvacet" class="h-8 hidden dark:block">
      </NuxtLink>
    </template>

    <UNavigationMenu :items="links" />

    <template #right>
      <div class="flex items-center gap-2">
        <UButton
          v-for="social in socialLinks"
          :key="social.to"
          :icon="social.icon"
          :to="social.to"
          target="_blank"
          variant="ghost"
          color="neutral"
        />
        <UColorModeButton />
      </div>
    </template>
  </UHeader>
</template>
