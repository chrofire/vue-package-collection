import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Vue 封装合集',
    description: 'Vue 封装合集',
    lang: 'zh-CN',
    lastUpdated: true,
    base: '/vue-package-collection/',
    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {
        nav: [
            { text: 'Demo', link: '/demo' }
        ],
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/chrofire/vue-package-collection'
            }
        ]
    },
    cacheDir: '../node_modules/.vitepress/cache'
})
