<script lang='ts' setup>
const { path } = useRoute()
const { data } = await useAsyncData('data', () => queryContent(path).findOne())
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
      <NextPageBtn />
    </div>
  </div>
</template>

<style scoped></style>
