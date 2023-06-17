<script lang='ts' setup>
const { path } = useRoute()
const { data: blobData } = await useAsyncData('blobData', () => queryContent(path).findOne())
</script>

<template>
  <BackTo :parent-path="path" />
  <ContentRenderer :value="blobData === null ? {} : blobData">
    <ContentRendererMarkdown :value="blobData === null ? {} : blobData" />
    <template #empty>
      <p>No content found.</p>
    </template>
  </ContentRenderer>
</template>

<style scoped></style>
