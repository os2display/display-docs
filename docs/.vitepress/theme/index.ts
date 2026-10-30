import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import NewsList from './NewsList.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NewsList', NewsList)
  },
} satisfies Theme
