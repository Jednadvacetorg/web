<script setup lang="ts">
const mobileLinks = [
  { label: 'Medojedíci', to: '/medojedici/' },
  { label: 'Kalendář', to: '/kalendar/' },
  { label: 'Přispěj nebo získej financování', to: '/finance/' },
  { label: 'Blog', to: '/blog/' },
  { label: 'Obchod', to: '/obchod/' },
  { label: 'Košík', to: '/kosik/' },
  { label: 'Affiliate odkazy', to: '/partneri/' },
  { label: 'X', icon: 'i-simple-icons-x', to: 'https://x.com/jednadvacetorg', target: '_blank' },
  { label: 'Facebook', icon: 'i-simple-icons-facebook', to: 'https://www.facebook.com/profile.php?id=61573496275870', target: '_blank' },
  { label: 'Instagram', icon: 'i-simple-icons-instagram', to: 'https://www.instagram.com/jednadvacetorg', target: '_blank' },
  { label: 'WhatsApp', icon: 'i-simple-icons-whatsapp', to: 'https://chat.whatsapp.com/B8fQowgJLf2Bo1DCXOId0n', target: '_blank' }
]
</script>

<template>
  <UHeader :links="mobileLinks">
    <template #left>
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>
    </template>

    <AppNavMenu class="max-lg:hidden" />

    <template #right>
      <AppSocialMenu class="max-lg:hidden" />
    </template>

    <template #body>
      <AppNavMenu orientation="vertical" :ui="{ link: 'py-3 text-xl justify-center' }" />
      <AppSocialMenu class="justify-center mt-14" />
    </template>
  </UHeader>
</template>
