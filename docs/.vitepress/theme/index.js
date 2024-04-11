import 'uno.css'
import '../styles/index.scss'

import { provideGlobalConfig } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Layout from './Layout.vue'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    Layout () {
        return h(Layout, null, {})
    },
    enhanceApp ({ app, router, siteData }) {
        provideGlobalConfig({
            locale: zhCn
        }, app, true)
    }
}
