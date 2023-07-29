export default defineAppConfig({
  contact: {
    github: {
      url: 'https://github.com/zhang771',
    },
  },
  /** 页面滚动多少时展示返回顶部 */
  pageScroolTop: 50,
  /** 跳转的地址链接 */
  paths: [
    {
      label: 'Home',
      icon: 'solar:home-angle-broken',
      value: '/',
    },
    {
      label: 'Artical',
      icon: 'solar:ruler-cross-pen-broken',
      value: '/artical',
    },
    {
      label: 'Demo',
      icon: 'solar:backpack-outline',
      value: '/demo',
    },
  ],
  
  /** 头部跳转展示文字还是图标
   * @type 'text' | 'icon'
   */
  isHeaderTextOrIcon: 'text',
})
