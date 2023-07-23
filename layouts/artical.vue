<script lang='ts' setup>
import { loadingKeep } from '@/utils/common'
import { useArticalStore } from '@/stores/artical'

const articalDataList = ref<any[]>([])

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
const router = useRouter()
const articalStore = useArticalStore()

const activeBtn = ref(buttons[0].value)
const modalVisible = ref(false)
const drawerVisible = ref(false)
const iptVal = ref('')
const isScrolling = inject<Ref<boolean>>('isScrolling')
const activeSelectHeaderStyleVal = ref(settings.headerTabStyle[0].value)
const [loading] = useToggle()

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

function fetchGetContentPage(articalType: string) {
  const queryFn = () => queryContent(`/artical/${articalType}`).only(['_path', 'title', 'createTime']).sort({ createTime: -1 }).find().then((res) => {
    articalDataList.value = res.map((item) => {
      return {
        ...item,
        createTime: useDateFormat(item.createTime, 'YYYY-MM-DD'),
      }
    })
  })

  loadingKeep(queryFn, loading, () => true, 500)
}

watch(() => articalStore.activeArticalPath, (val) => {
  handleSelectChange(val)
})

function handleSelectChange(vals: string[]) {
  // @ts-expect-error this is just because of the type limit for routepath
  router.push(`/artical/${vals[0]}`)
  fetchGetContentPage(vals[0])
}

fetchGetContentPage(articalStore.activeArticalPath[0])
</script>

<template>
  <main class="w-full flex justify-center pb-40">
    <ActiveBgList v-if="!loading" :is-route="true" :list="articalDataList" label-field="title" />
    <div v-else h-100 w-full flex-center>
      <Icon size="30" name="svg-spinners:blocks-shuffle-3" />
    </div>
    <Transition name="fade">
      <ButtonListAni v-show="!isScrolling" v-model:value="activeBtn" :size="20" :list="buttons" popup-value="catagray" @show-again="handleShowAgain">
        <template #popup>
          <SelectCard v-model:values="articalStore.activeArticalPath " :list="articalStore.selectCards" :muti="false" />
        </template>
      </ButtonListAni>
    </Transition>
    <Modal v-model:model-visible="modalVisible">
      <SelfInput v-model:value="iptVal" />
    </Modal>
    <Drawer v-model:visible="drawerVisible" :width="400" title="设置中心">
      <div class="h-60px flex-col-center">
        <span class="mr-5">头部样式</span>
        <Tab
          v-model:value="activeSelectHeaderStyleVal"
          class="text-14px font-normal border-com"
          :tabs="settings.headerTabStyle"
          @update:value="(val) => app.isHeaderTextOrIcon = val as string"
        />
      </div>
    </Drawer>
  </main>
</template>

<style scoped>
</style>
