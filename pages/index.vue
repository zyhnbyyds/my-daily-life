<script lang='ts' setup>
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div lg="flex flex-row h-full" sm="flex" class="relative flex justify-center p-4 transition-all">
    <div sm="w-full h-auto" lg="w-3xl" class="w-full rounded-2 px-4 py-7">
      <span class="pl-7 text-6">
        Hi. My name is YuJie.Zhang. Nice to see you here. I am a frounted developer.
      </span>
    </div>
    <PreImg src="/my.jpg" :height="100" :width="100" />
    <!-- TODO task list <br>
      1. md file image preview [md文件的图片预览]
      2. demo page thumbnail add [demo页面的缩略图预览] -->
  </div>
</template>

<style scoped></style>
