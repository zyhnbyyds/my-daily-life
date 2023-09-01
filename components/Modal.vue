<script lang='ts' setup>
const props = withDefaults(defineProps<{
  width?: string | number
  top?: string | number
  bgTransparent?: boolean
  title?: string
  header?: boolean
}>(), {
  width: 600,
  top: 100,
  bgTransparent: false,
  header: true,
})

const { width, top, bgTransparent, header, title } = toRefs(props)

const modelVisible = defineModel<boolean>('modelVisible', { required: true, default: false })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="op-0"
      leave-to-class="op-0"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
    >
      <div v-if="modelVisible" class="absolute-0 z-999 h-full max-h-100vh w-full overflow-hidden bg-gray-800 bg-op50" @click.self.prevent="modelVisible = false">
        <div
          :style="{ width: styleTypeReduce(width), top: styleTypeReduce(top) }"
          class="z-1000 rounded-md shadow-md absolute-x-center border-com bg-com"
          :class="{ '!bg-op-0 !border-op-0 !shadow-none': bgTransparent }"
        >
          <slot v-if="header" name="footer">
            <div flex p-2 justify="between">
              <!-- title -->
              <span>{{ title }}</span>
              <div p-0.1 cursor="pointer" hover="bg-my-20 rounded" @click="modelVisible = false">
                <div carbon:close text-2xl />
              </div>
            </div>
          </slot>
          <div p-com>
            <slot />
          </div>
          <!-- JustForImgPre -->
          <div class="bottom-10 z-9999 absolute-x-center">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
</style>
