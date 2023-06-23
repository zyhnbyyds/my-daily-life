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
    <div ref="toTopRef" class="scrool-style h-[calc(100vh-7rem)] overflow-y-auto pb-5">
      <NuxtLayout>
        <ToTop :top="y" @go-top="y = 0" />
        <div>
          <NuxtPage :page-key="$route.fullPath" />
        </div>
      </NuxtLayout>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
