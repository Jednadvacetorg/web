<template>
  <Head>
    <Body class="bg-cover bg-fixed bg-center bg-orange-800" :style="{ 'background-image': `url(${bgSrc})` }" />
  </Head>
  <UApp>
    <AppNavBar />
    <UContainer class="min-h-[calc(100vh-2*var(--ui-header-height))] flex items-center justify-center text-center py-10">
      <slot />
    </UContainer>
    <AppFooter />
  </UApp>
</template>

<script setup lang="ts">
defineProps<{
  bgSrc: string
}>()
</script>
