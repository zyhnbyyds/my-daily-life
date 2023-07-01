<script lang='ts' setup>
const modelVisible = defineModel<boolean>('modelVisible', { required: true, default: false })
const iptVal = ref('')
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-if="modelVisible">
        <div class="absolute left-0 top-0 z-10 h-full w-full bg-#333 bg-opacity-30" @click.stop="modelVisible = false" />
        <div dark="border-#333" class="absolute left-1/2 top-100px z-11 w-600px overflow-hidden border border-#e5e5e5 rounded-md bg-white bg-op20 px-5 py-3 shadow-md -translate-x-1/2 dark:bg-#444">
          <div>
            <SelfInput v-model:value="iptVal" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped></style>
