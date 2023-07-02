<script lang='ts' setup>
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

const selectedVals = ref<(string)[]>([selectCards[0].value])
const activeBtn = ref(buttons[0].value)
const modalVisible = ref(false)

watch(() => activeBtn.value, (val) => {
  if (val === 'search')
    modalVisible.value = true
})

onKeyStroke('Escape', () => {
  modalVisible.value = false
})

onKeyStroke(['Ctrl', 'k'], (e) => {
  e.preventDefault()
  modalVisible.value = true
})

function handleShowAgain(e: string) {
  if (e === 'search')
    modalVisible.value = true
}

const iptVal = ref('')
</script>

<template>
  <main class="w-full flex justify-center">
    <ActiveBgList :list="blobDataList" label-field="title" />
    <ButtonListAni v-model:value="activeBtn" :size="20" :list="buttons" popup-value="catagray" @show-again="handleShowAgain">
      <template #popup>
        <SelectCard :list="selectCards" :muti="false" @change="(val: string[]) => selectedVals = val" />
      </template>
    </ButtonListAni>
    <Modal v-model:model-visible="modalVisible">
      <SelfInput v-model:value="iptVal" />
    </Modal>
  </main>
</template>

<style scoped>
</style>
