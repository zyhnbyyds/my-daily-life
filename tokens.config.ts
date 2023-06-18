import { defineTheme } from 'pinceau'

export default defineTheme({
  typography: {
    letterSpacing: {
      tight: '-0.035em',
      wide: '0.035em',
    },
    fontSize: '12px',
  },
  prose: {
    h2: {
      fontSize: '24px',
    },
    th: {
      textAlign: 'center',
    },
  },
})
