<script lang='ts' setup>
import { useFn } from '../../composables/useFn'

/**
 * 消息项
 */
interface MessageItem {
  chatId: string
  whoPost: {
    userId: string
    userName: string
    age: number
    /** 性别 0-女 1-男 */
    sex: 0 | 1
    desc: string
  }
  /** 聊天内容 */
  content: string
  deleted: boolean
  updateTime: string
  createTime: string
}

const chatListRef = ref<HTMLDivElement | null>(null)
const { y } = useScroll(chatListRef, { behavior: 'smooth' })

const { data, refresh } = await useFetch<{
  data: MessageItem[]
  code: number
  message: string
}>('/apiMock/chat/message/list')

const { data: avaImages } = await useFetch<string[]>('http://shibe.online/api/shibes?count=2&urls=true&httpsUrls=true')

const current = ref('1111')
const iptVal = ref('')

const ddd = reactive({
  name: 'zzz',
  age: 2,
})

const { test } = useFn(ddd)

function handleClickSendBtn() {
  if (data.value) {
    data.value.data = [...data.value.data, {
      whoPost: {
        userId: '1111',
        userName: 'asd',
        age: 12312,
        sex: 1,
        desc: 'asdsad',
      },
      content: iptVal.value,
      deleted: false,
      updateTime: '123',
      createTime: 'asdsad',
      chatId: 'bew',
    }]
    scrollBottom()

    iptVal.value = ''
  }
}

onKeyStroke('Enter', () => {
  handleClickSendBtn()
})

function scrollBottom() {
  nextTick(() => {
    y.value = chatListRef.value?.scrollHeight ?? 0
  })
}

onMounted(() => {
  chatListRef.value?.scrollTo({ behavior: 'instant', top: chatListRef.value?.scrollHeight ?? 0 })
})
</script>

<template>
  <div class="hw-full flex-center">
    <div class="h-700px w-60% rounded-md shadow-lg" border="2 light-700 ">
      <header class="h-60px" flex justify="between" items-center>
        <div>
          张三
        </div>

        <div>
          <div class="ic:sharp-refresh" @click="refresh()" />
        </div>
      </header>
      {{ test }}

      <section ref="chatListRef" class="scroll-style h-[calc(100%-210px)] overflow-y-scroll p-3">
        <div v-for="item in data?.data" :key="item.chatId">
          <div flex items-center :class="current === item.whoPost.userId ? 'flex-justify-end' : ''">
            <nuxt-img v-if="current !== item.whoPost.userId" class="h-10 w-10" :src="avaImages ? avaImages[1] : ''" />

            <div relative mx-3 my-2 inline-block cursor-pointer rounded-md bg-dark-100 p-2 hover:bg-op60 text="white 14px">
              <span>
                {{ item.content }}
              </span>

              <div absolute-y-center :class="current === item.whoPost.userId ? '-right-6px triangle-right' : '-left-6px triangle-left'" />
            </div>

            <nuxt-img v-if="current === item.whoPost.userId" class="h-10 w-10" :src="avaImages ? avaImages[0] : ''" />
          </div>
        </div>
      </section>

      <footer class="relative h-150px w-full border-t border-light-700">
        <div h-30px flex-col-center px-3>
          <div carbon:face-satisfied />

          <div v-html="'<div carbon:face-satisfied />'" />
        </div>
        <textarea v-model="ddd.age" class="h-[calc(100%-30px)] w-full" outline="0" bg-transparent px-3 type="text" />
        <button class="absolute bottom-2 right-5 rounded-md bg-dark-100 px-4 py-2 hover:bg-op60" @click="handleClickSendBtn">
          发送
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.triangle-right {
  width: 0;
height: 0;
border-style: solid;
border-width: 6px 0 6px 10.4px;
border-color: transparent transparent transparent rgb(60, 60, 60) ;
}

.triangle-left {
  width: 0;
height: 0;
border-style: solid;
border-width: 6px 10.4px 6px 0;
border-color: transparent rgb(60, 60, 60) transparent transparent;
}
</style>
