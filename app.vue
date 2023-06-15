<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})

useSeoMeta({
  title: '我的生活日记',
  ogTitle: 'My Amazing Site',
  description: '关于我个人生活的简单介绍，对于生活类的',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
