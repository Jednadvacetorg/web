<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

// Automatické obnovení při 404, aby mohl zasáhnout serverový handler a zobrazit starý web.
if (import.meta.client && props.error.statusCode === 404) {
  window.location.reload()
}

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UApp>
    <UContainer class="min-h-screen flex flex-col items-center justify-center text-center">
      <template v-if="error.statusCode === 404">
        <USpinner size="xl" />
      </template>

      <div v-else class="space-y-6">
        <h1 class="text-9xl font-bold text-primary">
          {{ error.statusCode }}
        </h1>

        <div class="space-y-2">
          <h2 class="text-3xl font-semibold">
            Nastala chyba
          </h2>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {{ error.message || 'Omlouváme se, něco se pokazilo.' }}
          </p>
        </div>

        <div class="flex items-center justify-center gap-4">
          <UButton
            size="lg"
            label="Zpět na úvodní stránku"
            @click="handleError"
          />
        </div>
      </div>
    </UContainer>
  </UApp>
</template>
