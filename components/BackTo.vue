<script lang='ts' setup>
interface Props {
  parentPath: string
}

const props = defineProps<Props>()
const flag = ref(false)

const backPath = computed(() => {
  const arrs = props.parentPath.split('/')
  arrs.pop()
  return arrs.join('/')
})
</script>

<template>
  <NuxtLink :to="backPath">
    <div class="flex items-center" @mousemove="flag = true" @mouseout="flag = false">
      <div :class="flag ? '-left-0.5' : 'left-0'" class="relative mr-0.3 h-4 w-4 transition-all" i-carbon:arrow-left />
      返回
    </div>
  </NuxtLink>
</template>

<style scoped></style>
