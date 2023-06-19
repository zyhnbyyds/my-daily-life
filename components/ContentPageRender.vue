<script lang='ts' setup>
const { path } = useRoute()
const { data } = await useAsyncData('data', () => queryContent(path).findOne())

const { data: nextData } = await useAsyncData('nextData', () => {
  return queryContent().only(['title', '_path']).findSurround(path).then((data) => {
    return data.map((item) => {
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
