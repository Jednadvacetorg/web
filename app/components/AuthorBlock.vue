<script setup lang="ts">
const props = defineProps<{
  authorId: string
}>()

const { data: author } = await useAsyncData(`author-${props.authorId}`, async () => {
  return await queryCollection('people').path(`/people/${props.authorId}`).first()
})
</script>

<template>
  <div v-if="author" class="flex items-center gap-8 py-6">
    <UAvatar
      v-if="author.avatar"
      :src="author.avatar"
      :alt="author.title"
      size="3xl"
      :ui="{ root: 'size-36' }"
    />
    <UAvatar v-else :alt="author.title" size="3xl" :ui="{ root: 'size-36' }" />

    <div class="flex-1 min-w-0">
      <div class="flex gap-4 flex-wrap justify-end items-center">
        <h3 class="font-semibold text-lg grow">{{ author.title }}</h3>
        <UButton
          v-if="author.donateLnAddress"
          :to="`lightning:${author.donateLnAddress}`"
          size="md"
          trailing-icon="i-bitcoin-icons-lightning-filled"
        >
          Podpořit
        </UButton>
        <SocialLinks :links="author?.links || []" />
      </div>

      <ContentRenderer
        v-if="author.body"
        :value="author"
        class="text-sm text-muted prose dark:prose-invert prose-sm mt-1"
      />
    </div>
  </div>
</template>
