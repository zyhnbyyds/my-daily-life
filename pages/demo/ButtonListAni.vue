<script lang='ts' setup>
import type { BtnListItem } from '~/components/ButtonListAni.vue'

const list: BtnListItem[] = [
  {
    label: '代码',
    value: 'code',
    icon: 'solar:programming-broken',
  },
  {
    label: '探索中',
    value: 'search',
    icon: 'solar:calendar-search-line-duotone',
  },
  {
    label: '界面demo相关',
    value: 'demo',
    icon: 'solar:tuning-3-outline',
  },
]

const actBtn = ref<string>(list[0].value)
</script>

<!-- 带有动画效果的按钮集合 -->
<template>
  <div>
    <ButtonListAni v-model:value="actBtn" :list="list" />
  </div>
</template>

<style scoped></style>
