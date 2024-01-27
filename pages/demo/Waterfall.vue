<script lang='ts' setup>
import type { WaterfallItem } from '~/components/Waterfall.vue'

definePageMeta({
  layout: 'default',
})

const lifeDataList = ref((await queryContent<WaterfallItem>('life').only(['_path', 'title', 'createTime', 'imgUrl']).find() as unknown as WaterfallItem[]))
</script>

<template>
  <main class="m-auto mt-2 lg:w-10/12 sm:w-full sm:px-4">
    <Waterfall :data="lifeDataList" />
  </main>
</template>

<style scoped></style>
