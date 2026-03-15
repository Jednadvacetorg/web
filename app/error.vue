<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <NuxtLayout name="wallpaper" bg-src="/app/not-found-wallpaper.png">
    <div class="max-w-md flex flex-col items-center gap-10 text-white drop-shadow-lg">
      <h1 class="text-9xl font-bold text-primary/80">
        {{ error.status }}
      </h1>

      <div class="text-3xl font-semibold">
        <template v-if="error.status === 404">Špatná skládka</template>
        <template v-else>Nastala chyba</template>
      </div>

      <template v-if="error.status === 404">
        <p>Nebuť jako <ProseA href="https://forbes.cz/bitcoin-na-skladce-uz-brit-prestal-hledat-prakticka-lekce-jak-neprijit-o-miliardy/" target="_blank">James Howells</ProseA> který beznadějně hledá svůj harddisk s 8 000 bitcoiny na skládce v Newportu.</p>
        <p>Zkontroluj jestli hledáš na správné adrese nebo se zkus prohrabat od začátku na hlavní stránce.</p>
      </template>

      <p v-else>{{ error.message || 'Omlouváme se, něco se pokazilo.' }}</p>

      <UButton
        size="lg"
        label="Zpět na hlavní stránku"
        href="/"
      />
    </div>
</NuxtLayout>
</template>
