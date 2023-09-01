import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['bg-my-20', 'bg-#e5e5e5 bg-opacity-20'],
    ['flex-col-center', 'flex items-center'],
    ['flex-row-center', 'flex justify-center'],
    ['trans-all-300-ease', 'transition-all duration-300 transition-ease'],
    ['absolute-x-center', 'absolute left-1/2 -translate-x-1/2'],
    ['absolute-y-center', 'absolute top-1/2 -translate-y-1/2'],
    ['absolute-center', 'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'],
    ['absolute-0', 'absolute left-0 top-0'],
    ['hw-full', 'h-full w-full'],
    ['trans-300', 'transition-all duration-300'],
    ['trans-act-scale', 'transition-transform active:scale-99'],
    ['p-com', 'px-5 py-4'],
    ['border-com', 'dark:border-#222  border border-#e5e5e5'],
    ['bg-com', 'dark:bg-#333 bg-white'],
    ['shadow-com', 'border-t-1 border-#333 shadow-md border-op-20 dark:border-op-60 dark:shadow-#333'],
    ['btn', 'px-3 py-2 bg-com'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: ['i-', ''],
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetScrollbar(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
