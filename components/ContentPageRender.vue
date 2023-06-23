<script lang='ts' setup>
const { path } = useRoute()
const data = await queryContent(path).findOne()
useSeoMeta({
  title: data.value?.title,
  description: data.value?.desc,
})

const { data: nextData } = await useAsyncData('nextData', () => {
  return queryContent().only(['title', '_path']).findSurround(path)
})

const nextDataTransformed = computed(() => {
  if (!nextData.value)
    return
  return nextData.value.map((item) => {
    if (item === null)
      return null
    if (handlePathGetFirst(path) !== handlePathGetFirst(item._path))
      return null
    return {
      _path: item._path,
      title: item.title,
    }
  })
})
</script>

<template>
  <div>
    <BackTo :parent-path="path" />
    <div px-3>
      <ContentRenderer :value="data">
        <ContentRendererMarkdown :value="data" />
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
      <NextPageBtn :pre="nextDataTransformed ? nextDataTransformed[0] : null" :next="nextDataTransformed ? nextDataTransformed[1] : null" />
    </div>
  </div>
</template>

<style scoped></style>
