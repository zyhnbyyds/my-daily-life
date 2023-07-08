<script lang='ts' setup>
const blobDataList = ref<any[]>([])

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

const settings = {
  headerTabStyle: [
    {
      label: '文字',
      value: 'text',
    },
    {
      label: '图标',
      value: 'icon',
    },
  ],
}

const app = useAppConfig()
const selectedVals = ref<(string)[]>([selectCards[0].value])
const activeBtn = ref(buttons[0].value)
const modalVisible = ref(false)
const drawerVisible = ref(false)
const iptVal = ref('')
const isScrolling = inject<Ref<boolean>>('isScrolling')
const activeSelectHeaderStyleVal = ref(settings.headerTabStyle[0].value)
const [loading, loadAct] = useToggle()

watch(() => activeBtn.value, (val) => {
  if (val === 'search')
    modalVisible.value = true

  else if (val === 'setting')
    drawerVisible.value = true
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

  if (e === 'setting')
    drawerVisible.value = !drawerVisible.value
}

function fetchGetContentPage() {
  loadAct(true)
  queryContent('blob').only(['_path', 'title', 'createTime']).sort({ createTime: -1 }).find().then((res) => {
    blobDataList.value = res.map((item) => {
      return {
        ...item,
        createTime: useDateFormat(item.createTime, 'YYYY-MM-DD'),
      }
    })
    loadAct(false)
  })
}

fetchGetContentPage()
</script>

<template>
  <main class="w-full flex justify-center pb-40">
    <ActiveBgList v-if="!loading" :list="blobDataList" label-field="title" />
    <div v-else h-100 w-full flex-center>
      <Icon size="30" name="svg-spinners:clock" />
    </div>
    <Transition name="fade">
      <ButtonListAni v-show="!isScrolling" v-model:value="activeBtn" :size="20" :list="buttons" popup-value="catagray" @show-again="handleShowAgain">
        <template #popup>
          <SelectCard :list="selectCards" :muti="false" @change="(val: string[]) => selectedVals = val" />
        </template>
      </ButtonListAni>
    </Transition>
    <Modal v-model:model-visible="modalVisible">
      <SelfInput v-model:value="iptVal" />
    </Modal>
    <Drawer v-model:visible="drawerVisible" title="设置中心">
      <div class="h-60px flex-col-center">
        <span class="mr-5">头部样式</span>
        <Tab
          v-model:value="activeSelectHeaderStyleVal"
          class="text-14px font-normal"
          :tabs="settings.headerTabStyle"
          @update:value="(val) => app.isHeaderTextOrIcon = val as string"
        />
      </div>
    </Drawer>
  </main>
</template>

<style scoped>
</style>
