import path from 'node:path'
import { defineConfig } from 'vitepress'
import { nav, sidebar } from './configs'

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
    title: 'Vue 封装合集',
    description: 'Vue 封装合集',
    lang: 'zh-CN',
    lastUpdated: true,
    base: '/vue-package-collection/',
    // vitepress dev docs
    // docs: 项目根目录
    // docs/.vitepress: 配置目录
    // srcDir: 源目录, 相对于项目根目录
    // 在 markdown 中 @ 为 srcDir
    srcDir: './',
    // https://vitepress.dev/zh/reference/default-theme-config
    themeConfig: {
        nav,
        sidebar,
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/chrofire/vue-package-collection'
            }
        ],
        search: {
            // 本地搜索
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索'
                    },
                    modal: {
                        footer: {
                            navigateText: '切换',
                            selectText: '选择',
                            closeText: '关闭'
                        }
                    }
                }
            }
        },
        outline: {
            label: '页面导航',
            // h2-h6 作为目录标题
            level: [2, 6]
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        lastUpdatedText: '最后更新时间',
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        editLink: {
            pattern: ({ filePath }) => {
                return `https://github.com/chrofire/vue-package-collection/tree/main/docs/${filePath}`
            },
            text: '在 GitHub 上编辑此页面'
        },
        notFound: {
            title: '未找到页面',
            quote: '',
            linkText: '返回首页'
        }
    },
    markdown: {
        lineNumbers: false,
        container: {
            tipLabel: '提示',
            warningLabel: '警告',
            dangerLabel: '危险',
            infoLabel: '信息',
            detailsLabel: '详细信息'
        }
    },
    // cacheDir: '../node_modules/.vitepress/cache'
    cacheDir: path.resolve(__dirname, '../../node_modules/.vitepress/cache')
})
