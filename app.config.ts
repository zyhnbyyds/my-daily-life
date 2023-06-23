export default defineAppConfig({
  contact: {
    github: {
      url: 'https://github.com/zhang771',
    },
  },
  /** 页面滚动多少时展示返回顶部 */
  pageScroolTop: 600,
  /** 跳转的地址链接 */
  paths: [
    {
      label: 'Home',
      icon: 'solar:home-angle-broken',
      value: '/home',
    },
    {
      label: 'Life',
      icon: 'solar:backpack-outline',
      value: '/life',
    },
    {
      label: 'Blob',
      icon: 'solar:ruler-cross-pen-broken',
      value: '/blob',
    },
  ],
  /** 头部跳转展示文字还是图标
   * @type 'text' | 'icon'
   */
  isHeaderTextOrIcon: 'icon',
})
