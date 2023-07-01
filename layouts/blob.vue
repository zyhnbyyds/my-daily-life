<script lang='ts' setup>
const listRef = ref<HTMLElement>()

const blobDataList = ref<any[]>([])
queryContent('blob').only(['_path', 'title', 'createTime']).sort({ createTime: -1 }).find().then((res) => {
  blobDataList.value = res.map((item) => {
    return {
      ...item,
      createTime: useDateFormat(item.createTime, 'YYYY-MM-DD'),
    }
  })
})

const buttons: Components.BtnListItem[] = [
  {
    label: '分类',
    icon: 'solar:checklist-minimalistic-outline',
    value: 'catagray',
  },
  {
    label: '搜索',
    icon: 'solar:rounded-magnifer-linear',
    value: 'search',
  },
  {
    label: '设置',
    icon: 'solar:settings-outline',
    value: 'setting',
  },
]

const selectCards = [
  {
    label: '博客',
    value: 'blob',
  },
  {
    label: '生活',
    value: 'life',
  },
  {
    label: '日记',
    value: 'daily',
  },
]

const selectedVals = ref<(string | number)[]>([selectCards[0].value])
const activeBtn = ref(buttons[0].value)
</script>

<template>
  <main class="w-full flex justify-center">
    <ActiveBgList :list="blobDataList" label-field="title" />
    <ButtonListAni v-model:value="activeBtn" :size="20" :list="buttons" popup-value="catagray">
      <template #popup>
        <MutiSelectCard :list="selectCards" @change="(val: (string | number)[]) => selectedVals = val" />
      </template>
    </ButtonListAni>
  </main>
</template>

<style scoped>
</style>
