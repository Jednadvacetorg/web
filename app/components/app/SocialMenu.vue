<script setup lang="ts">
import { h } from 'vue'

const IconNostr = () => h(
  'svg',
  { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
  [
    h(
      'path',
      {
        'fill': 'currentColor',
        'd': 'm24 23c0 0.5-0.4 0.9-0.9 0.9h-10.2c-0.5 0-0.9-0.4-0.9-0.9v-2.3c0-2.9 0.3-5.6 1-6.9 0.3-0.7 1-1.2 1.7-1.4 1.4-0.4 3.8-0.1 4.8-0.1 0 0 3.1 0.1 3.1-1.7 0-1.7-1.4-1.3-1.4-1.3-1.5 0.1-2.7 0-3.4-0.3-1.3-0.5-1.3-1.4-1.3-1.7-0.1-3.5-5.2-3.9-9.8-3-4.9 0.9 0.1 8 0.1 17.5v1.3c0 0.4-0.4 0.8-0.8 0.8h-5.1c-0.5 0-0.9-0.4-0.9-0.9v-21.7c0-0.5 0.4-0.9 0.9-0.9h4.8c0.4 0 0.8 0.4 0.8 0.9 0 0.7 0.8 1.1 1.4 0.7 1.7-1.3 3.9-1.9 6.4-1.9 5.5 0 9.7 3.2 9.7 10.4v12.5zm-9.2-15.1c0-1-0.8-1.8-1.8-1.8-1 0-1.8 0.8-1.8 1.8 0 1 0.8 1.8 1.8 1.8 1 0 1.8-0.8 1.8-1.8z'
      }
    )
  ]
)

const socialLinks = [
  { icon: IconNostr, to: 'https://nostr.com/nprofile1qqsrugq6wmqv2k53z7ugqnqq5dq4n9g5vfw7skc84mlwlfad7wrg5ksvqhljh', target: '_blank', label: 'Nostr' },
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
