<script lang='ts' setup>
import type { TabItem } from './Tab.vue'

interface Props {
  paths: TabItem[]
}

const props = defineProps<Props>()

const { path } = useRoute()

const activeIndex = ref<string>(handlePathGetFirst(path))
</script>

<template>
  <div class="flex justify-center py-4 font-600">
    <Tab v-model:value="activeIndex" :is-route="true" :tabs="props.paths">
      <template #extra>
        <DarkToggle class="px-2" />
      </template>
    </Tab>
  </div>
</template>

<style scoped>

</style>
