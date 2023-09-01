<script lang="ts" setup>
import { Editor } from '@wangeditor/editor-for-vue'
import { emojiList, emojiPerfix } from '~/constants/Emoji'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

const editorConfig = {
  placeholder: '请输入内容...',
}

const [visible, toggle] = useToggle(false)

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})

function handleCreated(editor: any) {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const icons = handleIconsFromIconfyJson({ key: 'face', filterList: emojiList, perfix: emojiPerfix })

const activeKey = ref('streamline-emojis:beaming-face-with-smiling-eyes')

watch(() => activeKey.value, () => {
  valueHtml.value = '<img src="PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDY0IDY0Ij48cGF0aCBmaWxsPSIjZmZkZDY3IiBkPSJNNTIuNCA0My45Yy0zLjItMS4yLTIuMS02LjgtMi4xLTYuOEgxMy43czEuMSA1LjYtMi4xIDYuOGMwIDAtMi42LS4zLTIuNiAyLjdjMCAzLjcgMi43IDMgMi43IDNDMTEuNyA1NS4yIDE3LjQgNjEgMzIgNjFjMTQuNiAwIDIwLjMtNS45IDIwLjMtMTEuNGMwIDAgMi43LjYgMi43LTNjMC0zLTIuNi0yLjctMi42LTIuNyIvPjxwYXRoIGZpbGw9IiM0NTQ3NDkiIGQ9Ik01MC41IDM4LjZ2MTAuOWMwIDUtNS4yIDEwLjQtMTguNCAxMC40cy0xOC40LTUuMy0xOC40LTEwLjRWMzguNmgtMS45djExLjljMCA1LjYgNS43IDExLjQgMjAuMyAxMS40UzUyLjQgNTYgNTIuNCA1MC41VjM4LjZoLTEuOSIvPjxnIGZpbGw9IiNmZmYiPjxjaXJjbGUgY3g9IjQxLjUiIGN5PSI0NiIgcj0iNS4zIi8+PGNpcmNsZSBjeD0iMjIuNiIgY3k9IjQ2IiByPSI1LjMiLz48L2c+PGcgZmlsbD0iIzY2NGUyNyI+PHBhdGggZD0iTTI2LjUgNTMuOWMtLjEuMS0uMi4zLS4yLjVjMCAxLjMgMi42IDIuOSA1LjggMi45czUuOC0xLjYgNS44LTIuOWMwLS4yIDAtLjQtLjEtLjVjMCAwLTIuNSAxLjEtNS42IDEuMWMtMy4zIDAtNS43LTEuMS01LjctMS4xIi8+PGNpcmNsZSBjeD0iNDEuNSIgY3k9IjQ2IiByPSIzLjgiLz48L2c+PGNpcmNsZSBjeD0iNDEuNSIgY3k9IjQ2IiByPSIxLjIiIGZpbGw9IiMyMzFmMjAiLz48Y2lyY2xlIGN4PSIyMi41IiBjeT0iNDYiIHI9IjMuOCIgZmlsbD0iIzY2NGUyNyIvPjxjaXJjbGUgY3g9IjIyLjUiIGN5PSI0NiIgcj0iMS4yIiBmaWxsPSIjMjMxZjIwIi8+PHBhdGggZmlsbD0iIzQ1NDc0OSIgZD0iTTU3LjMgMzYuOGMyLjYtLjIgNC43LTIuMSA0LjctMi4xYy0xLjQtLjUtMi43LTIuNi0zLjktMy4xYzEuMy0uMiAyLjQtMi4xIDMuNy0yLjljLS43LS4yLTMuMi0xLjktNC0yLjFjMS4zLS42IDIuNi0xLjYgMy44LTIuOGMtMS4xLS4xLTIuOC0yLjItMy40LTIuMmMyLjItMSAzLjItMi45IDMuMi0yLjljLTEgLjEtMi4zLTEuNy0zLjUtMS44YzIuNC0xLjUgMi4yLTQuMyAyLjItNC4zYy0xLjQuOS0zLjUuMi00LjEuNGMxLjItMS45LjctNC40LjctNC40Yy0xIDEuMy0yLjQuOC0zLjEgMS4yYy4zLS45LS42LTIuNy0uMy0zLjhjLTEgMS0yLjkuOS0zLjYgMi4xYy4yLTEuMi0uNy0yLjktLjgtNC4zYy0uOC45LTIuNiAyLjItMi45IDIuOWMtLjEtMS0xLjQtMi40LTEuOC0zLjVjLS4zLjctMiAyLjYtMi4zIDMuMWMtLjItMS43LS41LTEuOS0xLjItMy4xYy0uMi44LTEuOSAxLjctMi40IDMuMWMtLjQtMi0xLjQtMy4xLTEuOS0zLjljLS4zIDEtMiAyLjQtMi4yIDMuMUMzMy44IDQuMSAzMiAyIDMyIDJzLTEuOCAyLjEtMi4yIDMuNWMtLjItLjYtMS45LTIuMS0yLjItMy4xYy0uNC44LTEuNSAxLjktMS45IDMuOWMtLjQtMS40LTIuMS0yLjItMi40LTMuMWMtLjcgMS4yLTEgMS40LTEuMiAzLjFjLS4zLS41LTItMi4zLTIuMy0zLjFjLS40IDEtMS42IDIuNC0xLjggMy41Yy0uMy0uNy0yLjEtMi0yLjgtMi44Yy0uMiAxLjQtMS4xIDMuMS0uOCA0LjNjLS43LTEuMy0yLjUtMS4yLTMuNS0yLjJjLjMgMS4xLS42IDIuOC0uMyAzLjhjLS44LS40LTIuMi4xLTMuMi0xLjJjMCAwLS41IDIuNC43IDQuNGMtLjYtLjItMi43LjQtNC4xLS40YzAgMC0uMiAyLjggMi4yIDQuM2MtMS4yLjEtMi42IDEuOC0zLjYgMS44YzAgMCAxIDEuOSAzLjIgMi45Yy0uNSAwLTIuMyAyLjItMy40IDIuMkMzLjYgMjUgNC44IDI2IDYuMiAyNi42Yy0uOC4yLTMuMyAxLjktNCAyLjFjMS4zLjggMi40IDIuNyAzLjcgMi45Yy0xLjIuNS0yLjUgMi42LTMuOSAzLjFjMCAwIDIuMSAxLjkgNC43IDIuMWMtMS4xLjQtLjUgMi41LTMuMiA0LjVjMy4zLS42IDMuNy41IDYuNy0xYzAgMCAuNSAyLjMtLjkgMy40YzAgMCA0LjUgMS44IDcuNC00Yy0uMiAxLjIgMS45IDEuOCAyLjUgNC4xYzIuNy0yLjYgMy4xLTUuMSAzLjEtNS4xYy40IDIuOSA0LjEgNCA0IDUuMmMxLjItLjkgMy0yLjIgMy4zLTQuMWMxLjggMiAxLjIgNSAxLjIgNXMzLjgtMS4zIDQuOS01Yy4yIDEuOSAxIDMuMSAyLjEgNGMtLjEtMS4yIDMuNi0yLjMgNC01LjJjMCAwIC40IDIuNSAzLjEgNS4xYy41LTIuNCAyLjYtMi45IDIuNS00LjFjMi45IDUuOCA3LjQgNCA3LjQgNGMtMS40LTEuMS0uOC0zLjQtLjgtMy40YzMgMS41IDMuNC40IDYuNyAxYy0yLjktMS45LTIuMy00LTMuNC00LjQiLz48L3N2Zz4=" />'
})
</script>

<template>
  <div h-500px style="border: 1px solid #ccc">
    <div streamline-emojis:beaming-face-with-smiling-eyes text-40 @click="toggle()" />

    <Icon :name="activeKey" size="60" />

    <div v-html="valueHtml" />

    <div class="overflow-hidden rounded-md p-10">
      <Editor
        v-model="valueHtml"
        style="height: 500px; overflow-y: hidden;"
        :default-config="editorConfig"
        mode="simple"
        @on-created="handleCreated"
      />
    </div>

    <Modal v-model:model-visible="visible">
      <IconSelect v-model="activeKey" :list="icons" />
    </Modal>
  </div>
</template>

<style scoped>
</style>
