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
    label: '首页',
    value: '/home',
  },
  {
    label: '生活',
    value: '/life',
  },
  {
    label: '博客',
    value: '/blob',
  },
])

const toTopRef = ref<HTMLElement>()
const { y } = useScroll(toTopRef, { behavior: 'smooth' })
</script>

<template>
  <div class="h-full w-full font-mono">
    <Header :paths="paths" />
    <div ref="toTopRef" class="scrool-style h-[calc(100vh-5rem)] overflow-y-auto">
      <NuxtLayout>
        <ToTop :top="y" @go-top="y = 0" />
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style scoped></style>
