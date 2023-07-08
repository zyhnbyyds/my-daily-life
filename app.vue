<script setup lang="ts">
import nprogress from 'nprogress'
import { appName } from '~/constants'

useHead({
  title: appName,
})

const route = useRoute()

useSeoMeta({
  title: '我的生活日记',
  description: '我的生活日记, 博客, 生活, blob daily life',
})

const { paths } = useAppConfig()

const toTopRef = ref<HTMLElement>()
const { y, isScrolling } = useScroll(toTopRef, { behavior: 'smooth' })
const nuxtApp = useNuxtApp()

provide('isScrolling', isScrolling)

nprogress.configure({ showSpinner: false })

nuxtApp.hook('page:start', () => {
  nprogress.start()
})

nuxtApp.hook('page:finish', () => {
  nprogress.done()
})

watch(() => route.path, (_path) => {
  if (y.value !== 0) {
    setTimeout(() => {
      y.value = 0
    }, 200)
  }
})
</script>

<template>
  <div class="h-full w-full font-mono">
    <Header :paths="paths" />
    <div ref="toTopRef" class="scroll-style h-[calc(100vh-5rem)] overflow-y-auto">
      <ToTop :top="y" @go-top="y = 0" />
      <div class="h-full pb-6">
        <NuxtLayout>
          <NuxtPage :page-key="$route.fullPath" />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
