<script setup lang="ts">
const props = defineProps<{
  authorId: string
}>()

const { data: author } = await useAsyncData(`author-${props.authorId}`, async () => {
  return await queryCollection('people').path(`/people/${props.authorId}`).first()
})
</script>

<template>
  <div v-if="author" class="flex items-start md:items-center gap-8 py-6">
    <UAvatar
      :src="author.avatar"
      :alt="author.title"
      size="3xl"
      :ui="{ root: 'size-16 sm:size-20 md:size-36' }"
    />

    <div class="flex-1 min-w-0">
      <div class="flex gap-4 flex-wrap items-center">
        <h3 class="font-semibold text-lg grow">{{ author.title }}</h3>
        <div class="flex gap-4">
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
      </div>

      <ContentRenderer
        v-if="author.body"
        :value="author"
        class="text-sm text-muted prose dark:prose-invert prose-sm mt-1"
      />
    </div>
  </div>
</template>
