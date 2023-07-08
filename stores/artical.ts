import { defineStore } from 'pinia'

export const useTestStore = defineStore('test-store', () => {
  const selectCards = reactive([
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
  ])
  const activeArticalPath = ref<string[]>([selectCards[0].value])

  return {
    activeArticalPath,
    selectCards,
  }
})
