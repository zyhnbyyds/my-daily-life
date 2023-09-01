import type { emojiList } from '~/constants/Emoji'

export interface FindIconsParams {
  key: string
  filterList: typeof emojiList
  perfix: string
}

export function handleIconsFromIconfyJson(params: FindIconsParams) {
  const { key, filterList, perfix } = params

  return filterList.filter(item => item.name.includes(key)).map(item => `${perfix}:${item.name}`)
}
