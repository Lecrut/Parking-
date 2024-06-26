// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import { VSparkline } from 'vuetify/labs/VSparkline'


import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VSparkline,
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#0054db',
            error: '#FF0110',
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: '#0054db',
            error: '#FF0110',
          },
        },
      },
    },
    defaults: {
      VBtn: {
        rounded: 'm',
        color: 'primary',
        variant: 'elevated',
      },
      VTextField: {
        variant: 'underlined',
      },
      VCombobox: {
        variant: 'underlined',
      },
      VSelect: {
        variant: 'underlined',
      }
    },
  })
  app.vueApp.use(vuetify)
})
