<script lang='ts' setup>
import type { WaterflowItem } from '~/components/Waterfall.vue'

definePageMeta({
  layout: 'default',
})

const lifeDataList = ref((await queryContent<WaterflowItem>('life').only(['_path', 'title', 'createTime', 'imgUrl']).find() as unknown as WaterflowItem[]))
</script>

<template>
  <main class="m-auto mt-2 lg:w-10/12 sm:w-full sm:px-4">
    <Waterfall :data="lifeDataList" />
  </main>
</template>

<style scoped></style>
