declare namespace Components {
  interface BtnListItem {
    label: string
    value: string
    icon: string
  }
}

declare namespace MusicApi {
  interface ApiRes<T> {
    code: number
    data: T
  }
}
