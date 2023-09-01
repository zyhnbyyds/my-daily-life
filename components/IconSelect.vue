<script lang='ts' setup>
interface Emits {
  (e: 'change', val: string): void
}

const props = withDefaults(defineProps<{
  list: string[]
  size?: string
}>(), { size: '40' })

const emits = defineEmits<Emits>()

const active = defineModel<string>()
const { list, size } = toRefs(props)

function handleClickIcon(e: string) {
  active.value = e
  emits('change', e)
}
</script>

<template>
  <div scrollbar="~ rounded" max-h-xl flex flex-wrap gap-2 overflow-y-scroll>
    <div v-for="item in list" :key="item" border rounded p-2 hover="bg-my-20 cursor-pointer" @click="handleClickIcon(item)">
      <Icon :name="item" :size="size" />
    </div>
  </div>
</template>

<style scoped></style>
