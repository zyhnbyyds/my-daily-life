<script lang='ts' setup>
const props = defineProps<{
  width?: string | number
  top?: string | number
}>()

const modelVisible = defineModel<boolean>('modelVisible', { required: true, default: false })

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
      <div v-if="modelVisible" class="absolute-0 z-999 h-full w-full bg-gray-800 bg-op50">
        <div
          ref="modalConRef"
          class="border-com bg-com p-com top-100px z-1000 w-600px rounded-md shadow-md absolute-x-center"
        >
          <div>
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
</style>
