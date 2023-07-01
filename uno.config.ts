import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

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
    ['hw-full', 'h-full w-full'],
    ['trans-300', 'transition-all duration-300'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetWind(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
