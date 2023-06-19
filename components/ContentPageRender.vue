<script lang='ts' setup>
const { path } = useRoute()
const { data } = await useAsyncData('data', () => queryContent(path).findOne())

const { data: nextData } = await useAsyncData('nextData', () => {
  return queryContent().only(['title', '_path']).findSurround(path)
})
</script>

<template>
  <div>
    <BackTo :parent-path="path" />
    <div px-3>
      <ContentRenderer :value="data === null ? {} : data">
        <ContentRendererMarkdown :value="data === null ? {} : data" />
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
      <NextPageBtn :pre="nextData ? nextData[0] : null" :next="nextData ? nextData[1] : null" />
    </div>
  </div>
</template>

<style scoped></style>
