<script lang='ts' setup>
const { path } = useRoute()
const { data: blobData } = await useAsyncData('blobData', () => queryContent(path).findOne())
</script>

<template>
  <div>
    <ContentRenderer :value="blobData === null ? {} : blobData">
      <ContentRendererMarkdown :value="blobData === null ? {} : blobData" />
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
  </div>
</template>

<style scoped></style>
