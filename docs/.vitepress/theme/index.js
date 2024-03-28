import 'uno.css'
import '../styles/index.scss'

import { provideGlobalConfig } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    Layout () {
        return h(DefaultTheme.Layout, null, {})
    },
    enhanceApp ({ app, router, siteData }) {
        provideGlobalConfig({
            locale: zhCn
        }, app, true)
    }
}
