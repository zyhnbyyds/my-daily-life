<script lang='ts' setup>
interface Props {
  parentPath: string
  icon?: string
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
    <div
      hover="bg-my-20 text-gray500"
      class="inline-flex items-center border border-gray-200 rounded-md px-2 py-1 font-bold dark:border-gray-600"
      @mousemove="flag = true"
      @mouseout="flag = false"
    >
      <Icon
        v-if="props.icon"
        :class="flag ? '-left-0.5' : 'left-0'"
        class="relative mr-0.3 h-4 w-4 transition-all duration-200"
        :name="props.icon"
      />
      返回
    </div>
  </NuxtLink>
</template>

<style scoped></style>
