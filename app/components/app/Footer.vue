<script setup lang="ts">
const footerLinks = [
  { label: 'Dvadsaťjeden (SK)', to: 'https://dvadsatjeden.org' },
  { label: 'Twentyone World (EN)', to: 'https://twentyone.world/' },
  { label: 'Einundzwanzig (DE)', to: 'https://einundzwanzig.space/' },
  { label: 'Btc Map', to: 'https://btcmap.org/' },
  { label: 'Kalendář', to: '/kalendar/' },
  { label: 'Mempool', to: 'https://mempool.jednadvacet.org' },
  { label: 'Explorer', to: 'https://explorer.jednadvacet.org' },
  { label: 'Whitepaper', to: '/bitcoin/' },
  { label: 'Grafika', to: 'https://github.com/Jednadvacetorg/jednadvacet-grafika' }
]
</script>

<template>
  <UFooter class="border-t border-gray-200 dark:border-gray-800 py-8">
    <UContainer>
      <div class="flex flex-col items-center gap-10">
        <AppSocialMenu />

        <AppNavMenu color="neutral" :ui="{ list: 'flex-wrap justify-center' }" />

        <div class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-500 dark:text-gray-400">
          <NuxtLink
            v-for="link in footerLinks"
            :key="link.to"
            :to="link.to"
            class="hover:text-primary transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </UFooter>
</template>
