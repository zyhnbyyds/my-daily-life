<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})

useSeoMeta({
  title: '我的生活日记',
  description: '我的生活日记, 博客, 生活, blob daily life',
})

const { paths } = useAppConfig()

const toTopRef = ref<HTMLElement>()
const { y } = useScroll(toTopRef, { behavior: 'smooth' })
</script>

<template>
  <div class="h-full w-full font-mono">
    <Header :paths="paths" />
    <div ref="toTopRef" class="scroll-style h-[calc(100vh-5rem)] overflow-y-auto">
      <ToTop :top="y" @go-top="y = 0" />
      <div class="pb-6">
        <NuxtLayout>
          <NuxtLoadingIndicator :height="3" />
          <NuxtPage :page-key="$route.fullPath" />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
