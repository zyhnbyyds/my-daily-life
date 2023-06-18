<script lang='ts' setup>
const { path } = useRoute()

const { data: blobData } = await useAsyncData('blobData', () => queryContent(path).findOne())
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="max-w-3xl w-full">
      <BackTo :parent-path="path" />
      <div px-3>
        <ContentRenderer :value="blobData === null ? {} : blobData">
          <ContentRendererMarkdown :value="blobData === null ? {} : blobData" />
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
