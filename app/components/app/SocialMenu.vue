<script setup lang="ts">
const socialLinks = [
  { icon: 'i-simple-icons-x', to: 'https://x.com/jednadvacetorg', target: '_blank', label: 'X' },
  { icon: 'i-simple-icons-facebook', to: 'https://www.facebook.com/profile.php?id=61573496275870', target: '_blank', label: 'Facebook' },
  { icon: 'i-simple-icons-instagram', to: 'https://www.instagram.com/jednadvacetorg', target: '_blank', label: 'Instagram' },
  { icon: 'i-simple-icons-whatsapp', to: 'https://chat.whatsapp.com/B8fQowgJLf2Bo1DCXOId0n', target: '_blank', label: 'WhatsApp' }
]
</script>

<template>
  <div class="flex items-center gap-2">
    <UButton
      v-for="social in socialLinks"
      :key="social.to"
      :icon="social.icon"
      :to="social.to"
      :target="social.target"
      variant="ghost"
      color="neutral"
    />
  </div>
</template>
