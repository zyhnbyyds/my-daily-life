<script lang='ts' setup>
interface Props {
  src: string
  height?: number | string
  width?: number | string
}

const props = defineProps<Props>()

const { src } = toRefs(props)
const modalVisible = ref(false)
</script>

<template>
  <div>
    <nuxt-img
      cursor-pointer
      :src="src"
      @click="modalVisible = true"
    />
    <Modal v-model:model-visible="modalVisible" top="30%" :bg-transparent="true">
      <img
        :src="src"
      >
      <template #footer>
        <div class="bottom-20 flex gap-20 rounded-6 bg-op-20 p-com absolute-x-center bg-com">
          <div i-solar:rounded-magnifer-zoom-in-outline />
          <div i-solar:rounded-magnifer-zoom-out-outline />
          <div i-solar:restart-square-outline />
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped></style>
