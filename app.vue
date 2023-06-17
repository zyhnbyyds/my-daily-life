<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})

useSeoMeta({
  title: '我的生活日记',
  description: '我的生活日记, 博客, 生活, blob daily life',
  twitterCard: 'summary_large_image',
})

const paths = reactive([
  {
    label: '生活',
    value: '/life',
  },
  {
    label: '博客',
    value: '/blob',
  },
])
const activeIndex = ref<string>('/life')

function handleChange(path: string) {
  activeIndex.value = path
}
</script>

<template>
  <div class="px-4">
    <Header :paths="paths" @change="handleChange" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer />
  </div>
</template>

<style>
html.dark {
  background: #222;
  color: white;
}
</style>
