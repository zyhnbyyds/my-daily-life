<script lang='ts' setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { useMusicStore } from '@/stores/music'

const musicStore = useMusicStore()

async function initData() {
  if (!musicStore.isActive) {
    await musicStore.getQrcodekey()
    await musicStore.getQrcodeUrl()
    musicStore.resume()
  }
}

const url = useQRCode(musicStore.qrcodeUrl)

onBeforeUnmount(() => {
  musicStore.pause()
})

initData()
</script>

<template>
  <div class="h-full w-full">
    <div class="h-30 w-30">
      <img class="h-full w-full" :src="url" alt="网易云登录验证码">
    </div>
  </div>
</template>

<style scoped></style>
