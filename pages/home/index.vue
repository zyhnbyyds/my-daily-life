<script lang='ts' setup>
definePageMeta({
  layout: 'default',
  key: 'home',
})
const ipt = ref<string>('')
const tabs = reactive([
  {
    label: '生活',
    value: 'life',
  },
  {
    label: '博客',
    value: 'blob',
  },
])
</script>

<template>
  <div>
    <!-- TODO fix erroe goto -->
    <Tab v-model:value="ipt" :tabs="tabs" />
  </div>
</template>

<style scoped></style>
