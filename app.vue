<script setup lang="ts">
import nprogress from 'nprogress'
import { appName } from '~/constants'

nprogress.configure({ showSpinner: false })

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
      <button class="mr-10" @click="nprogress.start()">
        start
      </button>
      <button @click="nprogress.done()">
        end
      </button>
      <ToTop :top="y" @go-top="y = 0" />
      <div class="pb-6">
        <NuxtLayout>
          <NuxtLoadingIndicator :height="10" />
          <NuxtPage :page-key="$route.fullPath" />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
