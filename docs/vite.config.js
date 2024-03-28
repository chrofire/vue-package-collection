import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { postcssIsolateStyles } from 'vitepress'

// https://cn.vitejs.dev/config/
export default defineConfig({
    plugins: [
        vueJsx(),
        UnoCSS(),
        AutoImport({
            resolvers: [
                ElementPlusResolver({
                    importStyle: false
                })
            ]
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: false
                })
            ]
        }),
        Inspect()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('../packages', import.meta.url)),
            docs: fileURLToPath(new URL('../docs', import.meta.url))
        }
    },
    css: {
        postcss: {
            plugins: [
                // https://github.com/vuejs/vitepress/blob/main/src/node/postcss/isolateStyles.ts
                // .vp-raw 类名下的内容 不受 vitepress 默认样式影响
                postcssIsolateStyles({
                    includeFiles: [/base\.css/, /vp-doc\.css/]
                })
            ]
        }
    },
    server: {
        port: 5173
    }
})
