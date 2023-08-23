<script lang='ts' setup>
import type { TabItem } from './Tab.vue'

interface Props {
  paths: TabItem[]
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
})

const { path } = useRoute()
const app = useAppConfig()

const activeIndex = ref<string>(handlePathGetFirst(path))
</script>

<template>
  <Transition>
    <div class="flex justify-center font-600">
      <Tab v-model:value="activeIndex" :follow-change="true" :is-route="true" :tabs="props.paths">
        <template #extra>
          <DarkToggle class="px-2" />
        </template>
        <template #default="{ data }">
          <div v-if="app.isHeaderTextOrIcon === 'text'">
            {{ data.label }}
          </div>
          <div v-else-if="app.isHeaderTextOrIcon === 'icon'">
            <Icon :name="data.icon ?? 'emojione:broken-heart'" />
          </div>
        </template>
      </Tab>
    </div>
  </Transition>
</template>

<style scoped>

</style>
