<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})

useSeoMeta({
  title: '我的生活日记',
  description: '我的生活日记, 博客, 生活, blob daily life',
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
    <NuxtLoadingIndicator :height="3" />
    <Header :paths="paths" />
    <div ref="toTopRef" class="scroll-style h-[calc(100vh-6rem)] overflow-y-auto pb-5">
      <NuxtLayout>
        <ToTop :top="y" @go-top="y = 0" />
        <NuxtPage :page-key="$route.fullPath" />
      </NuxtLayout>
    </div>
  </div>
</template>

<style scoped>

</style>
