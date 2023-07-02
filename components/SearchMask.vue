<script lang='ts' setup>
const modelVisible = defineModel<boolean>('modelVisible', { required: true, default: false })
const iptVal = ref('')

const modalConRef = ref<HTMLElement>()

onClickOutside(modalConRef, () => {
  modelVisible.value = false
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="op-0"
      leave-to-class="op-0"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
    >
      <div v-if="modelVisible" class="absolute left-0 top-0 z-999 h-full w-full bg-gray-800 bg-op50">
        <div ref="modalConRef" dark="border-#333 bg-#444 " class="top-100px z-9999 w-600px overflow-hidden border border-#e5e5e5 rounded-md bg-white px-5 py-3 shadow-md absolute-x-center">
          <SelfInput v-model:value="iptVal" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
</style>
