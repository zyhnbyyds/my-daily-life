<script lang='ts' setup>
import { styleTypeReduce } from '~/utils/common'

interface Props {
  src: string
  height: number | string
  width: number | string
}

const props = defineProps<Props>()

const { src, height, width } = toRefs(props)
const modalVisible = ref(false)

const imgStyle = computed(() => {
  return {
    height: styleTypeReduce(toValue(height)),
    width: styleTypeReduce(toValue(width)),
  }
})
</script>

<template>
  <div>
    <img
      cursor-pointer
      :src="src"
      :style="imgStyle"
      @click="modalVisible = true"
    >
    <Modal v-model:model-visible="modalVisible">
      <img
        :src="src"
        :style="imgStyle"
      >
      <div>
        editList
      </div>
    </Modal>
  </div>
</template>

<style scoped></style>
