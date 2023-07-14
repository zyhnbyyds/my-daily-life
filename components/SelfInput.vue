<script lang='ts' setup>
interface ResType {
  title: string
  _path: string
  createTime: string
}

const value = defineModel<string>('value', { required: true })

const [loading, toggle] = useToggle()
const queryList = ref<ResType[]>([])
const iptRef = ref<HTMLInputElement | null>(null)

const debouncedFn = useDebounceFn(() => {
  if (toValue(value) !== '')
    handleGetNearArtical(toValue(value))

  else
    queryList.value = []
}, 1000)

watch(() => toValue(value), (_val) => {
  debouncedFn()
})

async function handleGetNearArtical(target: string) {
  toggle(true)
  const before = Date.now()
  const res = await queryContent('artical')
    .where({ title: { $regex: target } })
    .only(['_path', 'title', 'createTime'])
    .find() as ResType[]

  queryList.value = res.map((item) => {
    return {
      ...item,
      createTime: useDateFormat(item.createTime, 'YYYY-MM-DD') as unknown as string,
    }
  })
  const after = Date.now()

  // 确保loading有300ms的持续时间
  if (after - before < 300) {
    setTimeout(() => {
      toggle(false)
    }, 300 - after + before)
  }
  else {
    toggle(false)
  }
}

onMounted(() => {
  iptRef.value?.focus()
})
</script>

<template>
  <div>
    <div class="flex-col-center border-1 rounded-sm pl-2 dark:border-#777">
      <Icon class="text-coolgray" size="24" :name="loading ? 'svg-spinners:tadpole' : 'solar:magnifer-linear'" />
      <input
        ref="iptRef" v-model="value"
        class="w-full rounded-lg bg-transparent px-3 py-3 text-16px font-500 font-mono text-inherit outline-none"
        type="text"
      >
    </div>
    <div class="scroll-style max-h-160 min-h-50 overflow-y-scroll">
      <div v-if="loading" class="hw-full min-h-50 flex-center">
        <Icon size="25" name="svg-spinners:bars-scale" />
      </div>
      <div v-else class="hw-full pt-2">
        <div v-if="!queryList || queryList.length === 0" class="hw-full min-h-50 flex-center">
          no-data
        </div>
        <ActiveBgList :is-route="true" class="font-normal" :list="queryList" label-field="title" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
